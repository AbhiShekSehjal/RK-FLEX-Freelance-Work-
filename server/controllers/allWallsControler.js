import AllWalls from "../models/allWallsModel.js";

export const getAllWalls = async (req, res) => {
    try {
        const walls = await AllWalls.find().populate("wallImages");

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getAllWalls : ", error);
    }
};

export const getWallsByColor = async (req, res) => {

    let { color } = req.query;

    try {
        const walls = await AllWalls.find({ "wallColorType": color });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallsByColor : ", error);
    }
}

export const getWallByDesignType = async (req, res) => {

    let { designType } = req.query;

    try {
        const walls = await AllWalls.find({ "wallDesignType": designType });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallByDesignType : ", error);
    }
}

export const getWallRoomType = async (req, res) => {

    let { roomType } = req.query;

    try {
        let walls = await AllWalls.find({ "wallRoomType": roomType });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallRoomType : ", error);
    }
}