import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const allWallsSchema = new schema({
    wallName: String,
    wallPrice: Number,
    wallRating: Number,
    wallImages: [
        {
            url: String,
            altText: String
        },
    ],
    wallDiscription: {
        type: String,
        unique: true
    },
    wallColorType: String,
    wallDesignType: String,
    wallRoomType: String,
});
// coustomerReviews: [{
//     type: schema.Types.ObjectId,
//     ref: "coustomerReviews"
// }],

const AllWalls = mongoose.model("AllWalls", allWallsSchema);

export default AllWalls;