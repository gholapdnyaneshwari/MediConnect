import express from "express";

import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
} from "../controllers/userController.js";

import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// Register
userRouter.post(
    "/register",
    registerUser
);

// Login
userRouter.post(
    "/login",
    loginUser
);

// Get Profile
userRouter.get(
    "/get-profile",
    authUser,
    getProfile
);

// Update Profile
userRouter.post(
    "/update-profile",
    upload.single("image"),
    authUser,
    updateProfile
);

export default userRouter;