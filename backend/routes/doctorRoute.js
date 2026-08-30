import express from 'express'

import {
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
} from '../controllers/doctorController.js'

import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()


// ================= GET ALL DOCTORS =================

doctorRouter.get(
    '/list',
    doctorList
)


// ================= DOCTOR LOGIN =================

doctorRouter.post(
    '/login',
    loginDoctor
)


// ================= DOCTOR APPOINTMENTS =================

doctorRouter.get(
    '/appointments',
    authDoctor,
    appointmentsDoctor
)


// ================= COMPLETE APPOINTMENT =================

doctorRouter.post(
    '/complete-appointment',
    authDoctor,
    appointmentComplete
)


// ================= CANCEL APPOINTMENT =================

doctorRouter.post(
    '/cancel-appointment',
    authDoctor,
    appointmentCancel
)


// ================= DOCTOR DASHBOARD =================

doctorRouter.get(
    '/dashboard',
    authDoctor,
    doctorDashboard
)


// ================= DOCTOR PROFILE =================

doctorRouter.get(
    '/profile',
    authDoctor,
    doctorProfile
)


// ================= UPDATE DOCTOR PROFILE =================

doctorRouter.post(
    '/update-profile',
    authDoctor,
    updateDoctorProfile
)


export default doctorRouter