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
    // console.log("Filltered color", color);

    try {
        const walls = await AllWalls.find({ "wallColorType": color });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallsByColor : ", error);
    }
}

export const getWallByDesignType = async (req, res) => {

    let { design } = req.query;
    if (design) {
        // console.log("Filltered design : ", design);
    }

    try {
        const walls = await AllWalls.find({ "wallDesignType": design });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallByDesignType : ", error);
    }
}

export const getWallRoomType = async (req, res) => {

    let { room } = req.query;
    // console.log("Filltered Room", room);

    try {
        let walls = await AllWalls.find({ "wallRoomType": room });

        res.json(walls);
    } catch (error) {
        console.log("Error happened in getWallRoomType : ", error);
    }
};

export const getSearchItem = async (req, res) => {
    let { item } = req.query;
    // console.log("Searched item : ", item);

    try {

        let items = await AllWalls.find({
            $or: [
                { wallName: { $regex: item, $options: "i" } },
                { wallColorType: { $regex: item, $options: "i" } },
                { wallDesignType: { $regex: item, $options: "i" } },
                { wallRoomType: { $regex: item, $options: "i" } }
            ]
        });

        res.json(items);
    } catch (error) {
        console.log("Error happened in getSearchItem : ", error);
    }
};

export const getProdictCard = async (req, res) => {
    const { product } = req.query;

    // console.log("I recieved a product in backend : ", product);

    try {
        const wall = await AllWalls.findById(product.id);

        res.json(wall);
    } catch (error) {
        console.log("Error happened in getProdictCard : ", error);

    }

}