import express from "express";
import { getAllWalls, getWallsByColor,getWallByDesignType,getWallRoomType } from "../controllers/allWallsControler.js";
const router = express.Router();

router.get("/allWalls", getAllWalls);
router.get("/selectByColor/colors", getWallsByColor);
router.get("/selectByDesignType/designs", getWallByDesignType);
router.get("/selectByRoomType/rooms", getWallRoomType);

export default router;