import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

// @desc   Register a new user
// @route  POST /api/auth/signup
// @access Public
export const signUp = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
        if (!userName || !userEmail || !userPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (userPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({ userEmail });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        const newUser = new User({
            userName,
            userEmail,
            userPassword: hashedPassword,
        });

        await newUser.save();

        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            userName: newUser.userName,
            userEmail: newUser.userEmail,
            userProfilePic: newUser.userProfilePic,
        });

    } catch (error) {
        console.error("Error in signUp:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// @desc   Log in existing user
// @route  POST /api/auth/login
// @access Public
export const logIn = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
        const user = await User.findOne({ userEmail });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(userPassword, user.userPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
            userProfilePic: user.userProfilePic,
        });

    } catch (error) {
        console.error("Error in logIn:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// @desc   Log out user
// @route  POST /api/auth/logout
// @access Private
export const logOut = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logOut:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// @desc   Check user authentication
// @route  GET /api/auth/check
// @access Private (middleware should attach user to req)
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
