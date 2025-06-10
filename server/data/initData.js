import AllWalls from "../models/allWallsModel.js";
import WallsData from "./allWallsData.js";
import connectDB from "../lib/db.js"

async function insertData() {
  connectDB();
  try {
    await AllWalls.deleteMany({});

    const insertedData = await AllWalls.insertMany(WallsData);
    console.log(insertedData);
    console.log("Data insert successfully");

  } catch (err) {
    console.log("Data Insertion failed : ", err);
  }
};

insertData();