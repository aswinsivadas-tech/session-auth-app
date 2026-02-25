import express from "express"
import {showLogin, loginUser,logoutUser } from "../controllers/authController.js";

const router = express.Router();


// GET /auth/login - Renders the login page
router.get("/login", showLogin);

// POST /auth/login - Sends the form data to your strict controller
router.post("/login",loginUser);


// GET /auth/logout - Handles logout
router.post("/logout",logoutUser);

export default router;