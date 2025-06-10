import express from "express";
import { checkAuth, logIn, logOut, signUp } from "../controllers/authUserController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logOut", logOut);

router.get("/checkAuth", protectRoute, checkAuth);

export default router;