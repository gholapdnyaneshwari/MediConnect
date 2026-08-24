import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";


// ===============================
// ADD DOCTOR
// ===============================
const addDoctor = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            available
        } = req.body;

        const imageFile = req.file;

        // Check missing details
        if (
            !name ||
            !email ||
            !password ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            !fees ||
            !address ||
            !imageFile
        ) {
            return res.json({
                success: false,
                message: "Missing Details"
            });
        }

        // Check email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Check password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("IMAGE FILE:", imageFile);
        console.log("IMAGE PATH:", imageFile.path);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(
            imageFile.path,
            {
                resource_type: "image"
            }
        );

        const imageUrl = imageUpload.secure_url;

        // Doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            available: available === "true",
            date: Date.now()
        };

        // Create doctor
        const newDoctor = new doctorModel(doctorData);

        await newDoctor.save();

        res.json({
            success: true,
            message: "Doctor Added"
        });

    } catch (error) {

        console.log("========== ERROR ==========");
        console.log("Message:", error.message);
        console.log("HTTP Code:", error.http_code);
        console.log("Name:", error.name);
        console.log("Full Error:", error);
        console.log("===========================");

        res.json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// ADMIN LOGIN
// ===============================
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {

            const token = jwt.sign(
                email + password,
                process.env.JWT_SECRET
            );

            res.json({
                success: true,
                token
            });

        } else {

            res.json({
                success: false,
                message: "Invalid credentials"
            });

        }

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// GET ALL DOCTORS
// ===============================
const allDoctors = async (req, res) => {

    try {

        const doctors = await doctorModel
            .find({})
            .select("-password");

        res.json({
            success: true,
            doctors
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


export {
    addDoctor,
    loginAdmin,
    allDoctors
};