import mongoose from "mongoose";
// import dotenv from "dotenv"

const connectDB = async () => {
  // dotenv.config();
  try {
    await mongoose.connect("mongodb+srv://shek54112:K3d0Zd2ye7nLWDkC@cluster0.y2khnzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
