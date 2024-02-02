import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

const DB_NAME = "Hacker-News";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
  } catch (error) {
    console.log("DB connection failed:  ", error);
    process.exit(1);
  }
};

export default connectDB;
