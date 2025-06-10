import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const signUp = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    try {
        if (!userName || !userEmail || !userPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (userPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ userEmail });

        if (user) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        const newUser = new User({
            userName,
            userEmail,
            userPassword: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                userName: newUser.userName,
                userEmail: newUser.userEmail,
                userPassword: newUser.userPassword,
                userProfilePic: newUser.userProfilePic
            });
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error happened in signUp at authUserController : ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logIn = async (req, res) => {

    const { userEmail, userPassword } = req.body;

    try {

        const user = await User.findOne({ userEmail });

        if (!user) {
            return res.status(400).json({ message: "Invaild credentials" });
        };

        const isCorrectPassword = await bcrypt.compare(userPassword, user.userPassword);

        if (!isCorrectPassword) {
            return res.status(400).json({ message: "Invaild credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
            userProfilePic: user.userProfilePic,
        });

    } catch (error) {
        console.log("Error happened in logIn at authUserController : ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logOut = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
       
        res.status(200).json({ message: "Logout successfully" })
    } catch (error) {
        console.log("Error happened in logOut at authUserController : ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error happened in checkAuth at authUserController : ", error);
        res.status(500).json({ message: "Internal server error" });
    }

}




 // res.clearCookie("Token", {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "Strict",
        // })