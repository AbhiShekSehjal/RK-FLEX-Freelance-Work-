import express from "express";
import { getAllWalls, getWallsByColor, getWallByDesignType, getWallRoomType, getSearchItem, getProdictCard } from "../controllers/allWallsControler.js";
const router = express.Router();

router.get("/allWalls", getAllWalls);
router.get("/selectByColor/colors", getWallsByColor);
router.get("/selectByDesignType/designs", getWallByDesignType);
router.get("/selectByRoomType/rooms", getWallRoomType);

router.get("/searchItem", getSearchItem);
router.get("/productCard", getProdictCard)

export default router;