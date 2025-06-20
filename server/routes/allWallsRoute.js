import express from "express";
import { getAllWalls, getWallsByColor, getWallByDesignType, getWallRoomType, getSearchItem, getProductCard } from "../controllers/allWallsControler.js";
const router = express.Router();

router.get("/walls", getAllWalls);
router.get("/walls/color", getWallsByColor);
router.get("/walls/design", getWallByDesignType);
router.get("/walls/room", getWallRoomType);
router.get("/walls/search", getSearchItem);
router.get("/walls/:id", getProductCard);


export default router;