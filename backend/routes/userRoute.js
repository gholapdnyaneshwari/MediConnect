import express from "express";

import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment
} from "../controllers/userController.js";

import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();


// ================= REGISTER =================

userRouter.post(
    "/register",
    registerUser
);


// ================= LOGIN =================

userRouter.post(
    "/login",
    loginUser
);


// ================= GET PROFILE =================

userRouter.get(
    "/get-profile",
    authUser,
    getProfile
);


// ================= UPDATE PROFILE =================

userRouter.post(
    "/update-profile",
    upload.single("image"),
    authUser,
    updateProfile
);


// ================= BOOK APPOINTMENT =================

userRouter.post(
    "/book-appointment",
    authUser,
    bookAppointment
);


// ================= LIST APPOINTMENTS =================

userRouter.get(
    "/appointments",
    authUser,
    listAppointment
);

userRouter.post('/cancel-appointment',authUser,cancelAppointment)

export default userRouter;