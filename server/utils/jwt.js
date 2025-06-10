import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userID, res) => {
    const Token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", Token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return Token
}