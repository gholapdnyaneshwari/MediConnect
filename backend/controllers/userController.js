import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";


// ================= REGISTER USER =================

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Missing Details"
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            });
        }

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = new userModel(userData);

        const user = await newUser.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        return res.json({
            success: true,
            token
        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};


// ================= LOGIN USER =================

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        return res.json({
            success: true,
            token
        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};


// ================= GET PROFILE =================

const getProfile = async (req, res) => {
    try {

        const { userId } = req.body;

        const userData = await userModel
            .findById(userId)
            .select("-password");

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,

            userData: {
                ...userData.toObject(),

                phone: userData.phone || "",

                address: {
                    line1: userData.address?.line1 || "",
                    line2: userData.address?.line2 || ""
                },

                gender: userData.gender || "Male",

                dob: userData.dob || "",

                image: userData.image || ""
            }
        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};


// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {
    try {

        const {
            userId,
            name,
            phone,
            address,
            dob,
            gender
        } = req.body;

        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({
                success: false,
                message: "Data Missing"
            });
        }

        let parsedAddress = {};

        if (address) {

            try {

                parsedAddress =
                    typeof address === "string"
                        ? JSON.parse(address)
                        : address;

            } catch (error) {

                return res.json({
                    success: false,
                    message: "Invalid address format"
                });
            }
        }

        await userModel.findByIdAndUpdate(
            userId,
            {
                name,
                phone,
                address: parsedAddress,
                dob,
                gender
            }
        );

        if (imageFile) {

            const imageUpload =
                await cloudinary.uploader.upload(
                    imageFile.path,
                    {
                        resource_type: "image"
                    }
                );

            const imageURL =
                imageUpload.secure_url;

            await userModel.findByIdAndUpdate(
                userId,
                {
                    image: imageURL
                }
            );
        }

        return res.json({
            success: true,
            message: "Profile Updated"
        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};


// ================= BOOK APPOINTMENT =================

const bookAppointment = async (req, res) => {

    try {

        const {
            userId,
            docId,
            slotData,
            slotTime
        } = req.body;

        if (
            !userId ||
            !docId ||
            !slotData ||
            !slotTime
        ) {

            return res.json({
                success: false,
                message: "Missing appointment details"
            });
        }

        const docData =
            await doctorModel
                .findById(docId)
                .select("-password");

        if (!docData) {

            return res.json({
                success: false,
                message: "Doctor not found"
            });
        }

        if (!docData.available) {

            return res.json({
                success: false,
                message: "Doctor not available"
            });
        }

        let slots_booked =
            docData.slots_booked || {};

        if (slots_booked[slotData]) {

            if (
                slots_booked[slotData]
                    .includes(slotTime)
            ) {

                return res.json({
                    success: false,
                    message: "Slot not available"
                });
            }

            slots_booked[slotData].push(
                slotTime
            );

        } else {

            slots_booked[slotData] = [
                slotTime
            ];
        }

        const userData =
            await userModel
                .findById(userId)
                .select("-password");

        if (!userData) {

            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const doctorObject =
            docData.toObject();

        delete doctorObject.slots_booked;

        const appointmentData = {

            userId,

            docId,

            userData:
                userData.toObject(),

            docData:
                doctorObject,

            amount:
                docData.fees,

            slotTime,

            slotData,

            date:
                Date.now(),

            cancelled:
                false,

            payment:
                false,

            isCompleted:
                false
        };

        const newAppointment =
            new appointmentModel(
                appointmentData
            );

        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(
            docId,
            {
                slots_booked
            }
        );

        return res.json({

            success: true,

            message:
                "Appointment Booked"

        });

    } catch (error) {

        console.log(error);

        return res.json({

            success: false,

            message:
                error.message

        });
    }
};


// ================= LIST APPOINTMENTS =================

const listAppointment = async (
    req,
    res
) => {

    try {

        const { userId } =
            req.body;

        const appointments =
            await appointmentModel
                .find({ userId })
                .sort({ date: -1 });

        return res.json({

            success: true,

            appointments

        });

    } catch (error) {

        console.log(error);

        return res.json({

            success: false,

            message:
                error.message

        });
    }
};


// ================= CANCEL APPOINTMENT =================

const cancelAppointment = async (
    req,
    res
) => {

    try {

        const {
            userId,
            appointmentId
        } = req.body;

        if (
            !userId ||
            !appointmentId
        ) {

            return res.json({

                success: false,

                message:
                    "Missing appointment details"

            });
        }

        const appointment =
            await appointmentModel
                .findById(appointmentId);

        if (!appointment) {

            return res.json({

                success: false,

                message:
                    "Appointment not found"

            });
        }

        if (
            appointment.userId.toString() !==
            userId.toString()
        ) {

            return res.json({

                success: false,

                message:
                    "Unauthorized action"

            });
        }

        if (appointment.cancelled) {

            return res.json({

                success: false,

                message:
                    "Appointment already cancelled"

            });
        }

        await appointmentModel.findByIdAndUpdate(

            appointmentId,

            {
                cancelled: true
            }

        );

        const {daocId, slotData, slotTime} = appointmentData

        const doctorData =
            await doctorModel.findById(
                appointment.docId
            );
        let slots_booked = doctorData.slot

        if (doctorData) {

            let slots_booked =
                doctorData.slots_booked || {};

            if (
                slots_booked[
                    appointment.slotData
                ]
            ) {

                slots_booked[
                    appointment.slotData
                ] =
                    slots_booked[
                        appointment.slotData
                    ].filter(
                        (slot) =>
                            slot !==
                            appointment.slotTime
                    );

                await doctorModel.findByIdAndUpdate(

                    appointment.docId,

                    {
                        slots_booked
                    }

                );
            }
        }

        return res.json({

            success: true,

            message:
                "Appointment Cancelled"

        });

    } catch (error) {

        console.log(error);

        return res.json({

            success: false,

            message:
                error.message

        });
    }
};


// ================= EXPORT =================

export {

    registerUser,

    loginUser,

    getProfile,

    updateProfile,

    bookAppointment,

    listAppointment,

    cancelAppointment

};