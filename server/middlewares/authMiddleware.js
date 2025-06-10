import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    const Token = req.cookies.jwt;

    try {
        if (!Token) {
            return res.status(401).json({ message: "Unautherized - No Token Provided" });
        };

        const decoded = jwt.decode(Token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unautherized - Invalid Token" })
        };

        const user = await User.findById(decoded.userID).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        };

        req.user = user;

        next();
    } catch (error) {
        console.log("Error happened in protectRoute : ", error);
        res.status(500).json({ message: "Internal server error" })
    }
}