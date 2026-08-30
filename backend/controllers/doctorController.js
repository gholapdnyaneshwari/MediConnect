import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";


// ===============================
// GET ALL DOCTORS
// ===============================

const doctorList = async (req, res) => {

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


// ===============================
// CHANGE DOCTOR AVAILABILITY
// ===============================

const changeAvailability = async (req, res) => {

    try {

        const { docId } = req.body;

        const docData =
            await doctorModel.findById(docId);

        if (!docData) {

            return res.json({
                success: false,
                message: "Doctor not found"
            });

        }

        await doctorModel.findByIdAndUpdate(
            docId,
            {
                available: !docData.available
            }
        );

        res.json({
            success: true,
            message: "Availability Changed"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }
};


// ===============================
// DOCTOR LOGIN
// ===============================

const loginDoctor = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const doctor =
            await doctorModel.findOne({ email });

        if (!doctor) {

            return res.json({
                success: false,
                message: "Invalid Credentials"
            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                doctor.password
            );

        if (isMatch) {

            const token =
                jwt.sign(
                    { id: doctor._id },
                    process.env.JWT_SECRET
                );

            return res.json({
                success: true,
                token
            });

        } else {

            return res.json({
                success: false,
                message: "Invalid Credentials"
            });

        }

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });

    }

};


// ===============================
// GET DOCTOR APPOINTMENTS
// ===============================

const appointmentsDoctor = async (req, res) => {

    try {

        const { docId } = req.body;

        const appointments =
            await appointmentModel.find({
                docId
            });

        res.json({
            success: true,
            appointments
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }

};


// ===============================
// COMPLETE APPOINTMENT
// ===============================

const appointmentComplete = async (req, res) => {

    try {

        const {
            docId,
            appointmentId
        } = req.body;

        const appointmentData =
            await appointmentModel.findById(
                appointmentId
            );

        if (
            appointmentData &&
            appointmentData.docId.toString() ===
            docId.toString()
        ) {

            await appointmentModel.findByIdAndUpdate(
                appointmentId,
                {
                    isCompleted: true
                }
            );

            return res.json({
                success: true,
                message: "Appointment Completed"
            });

        } else {

            return res.json({
                success: false,
                message: "Mark Failed"
            });

        }

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });

    }

};


// ===============================
// CANCEL APPOINTMENT
// ===============================

const appointmentCancel = async (req, res) => {

    try {

        const {
            docId,
            appointmentId
        } = req.body;

        const appointmentData =
            await appointmentModel.findById(
                appointmentId
            );

        if (
            appointmentData &&
            appointmentData.docId.toString() ===
            docId.toString()
        ) {

            await appointmentModel.findByIdAndUpdate(
                appointmentId,
                {
                    cancelled: true
                }
            );

            return res.json({
                success: true,
                message: "Appointment Cancelled"
            });

        } else {

            return res.json({
                success: false,
                message: "Cancel Failed"
            });

        }

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });

    }

};


// ===============================
// DOCTOR DASHBOARD
// ===============================

const doctorDashboard = async (req, res) => {

    try {

        const { docId } = req.body;

        const appointments =
            await appointmentModel.find({
                docId
            });

        let earnings = 0;

        appointments.forEach((item) => {

            if (
                item.isCompleted ||
                item.payment
            ) {
                earnings += item.amount;
            }

        });


        let patients = [];

        appointments.forEach((item) => {

            if (!patients.includes(item.userId)) {

                patients.push(item.userId);

            }

        });


        const dashData = {

            earnings,

            appointments:
                appointments.length,

            patients:
                patients.length,

            latestAppointments:
                [...appointments]
                    .reverse()
                    .slice(0, 5)

        };


        res.json({
            success: true,
            dashData
        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });

    }

};


// ===============================
// DOCTOR PROFILE
// ===============================

const doctorProfile = async (req, res) => {

    try {

        const { docId } = req.body;

        const profileData =
            await doctorModel
                .findById(docId)
                .select("-password");

        res.json({
            success: true,
            profileData
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }

};


// ===============================
// UPDATE DOCTOR PROFILE
// ===============================

const updateDoctorProfile = async (req, res) => {

    try {

        const {
            docId,
            fees,
            address,
            available
        } = req.body;

        await doctorModel.findByIdAndUpdate(
            docId,
            {
                fees,
                address,
                available
            }
        );

        res.json({
            success: true,
            message: "Profile Updated"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }

};


// ===============================
// EXPORT
// ===============================

export {
    doctorList,
    changeAvailability,
    loginDoctor,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
};