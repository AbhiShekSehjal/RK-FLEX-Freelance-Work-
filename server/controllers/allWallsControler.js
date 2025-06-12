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
    console.log("Filltered color", color);

    try {
        const walls = await AllWalls.find({ "wallColorType": color });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallsByColor : ", error);
    }
}

export const getWallByDesignType = async (req, res) => {

    let { design } = req.query;
    console.log("Filltered design : ", design);

    try {
        const walls = await AllWalls.find({ "wallDesignType": design });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallByDesignType : ", error);
    }
}

export const getWallRoomType = async (req, res) => {

    let { room } = req.query;
    console.log("Filltered Room", room);

    try {
        let walls = await AllWalls.find({ "wallRoomType": room });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallRoomType : ", error);
    }
}