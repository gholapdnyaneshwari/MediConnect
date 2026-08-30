import express from 'express'

import {
  addDoctor,
  allDoctors,
  loginAdmin,
  appointmentsAdmin,
  AppointmentCancel,
  adminDashboard
} from '../controllers/adminController.js'

import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()


// ================= ADD DOCTOR =================

adminRouter.post(
  '/add-doctor',
  authAdmin,
  upload.single('image'),
  addDoctor
)


// ================= ADMIN LOGIN =================

adminRouter.post(
  '/login',
  loginAdmin
)


// ================= GET ALL DOCTORS =================

adminRouter.post(
  '/all-doctors',
  authAdmin,
  allDoctors
)


// ================= CHANGE AVAILABILITY =================

adminRouter.post(
  '/change-availability',
  authAdmin,
  changeAvailability
)


// ================= GET ALL APPOINTMENTS =================

adminRouter.get(
  '/appointments',
  authAdmin,
  appointmentsAdmin
)


// ================= CANCEL APPOINTMENT =================

adminRouter.post(
  '/cancel-appointment',
  authAdmin,
  AppointmentCancel
)


// ================= ADMIN DASHBOARD =================

adminRouter.get(
  '/dashboard',
  authAdmin,
  adminDashboard
)


export default adminRouter