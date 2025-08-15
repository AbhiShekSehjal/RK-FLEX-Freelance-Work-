import express from "express";
import { checkAuth, logIn, logOut, signUp, updateProfilePic, updateAddress } from "../controllers/authUserController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logOut", logOut);

router.put('/update-profile-pic', updateProfilePic);

router.put("/update-address", updateAddress);

router.get("/checkAuth", protectRoute, checkAuth);

export default router;