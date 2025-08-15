import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

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

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfilePic = async (req, res) => {
    try {
        const { userId, userProfilePic } = req.body;

        // Validate input
        if (!userId || !userProfilePic) {
            return res.status(400).json({ message: "User ID and profile picture URL are required" });
        }

        // Update user document
        const user = await User.findByIdAndUpdate(
            userId,
            { userProfilePic },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ userProfilePic: user.userProfilePic });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;

        if (!userId || !address) {
            return res.status(400).json({ message: "User ID and address are required" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { address },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ address: user.address });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Server error" });
    }
};
