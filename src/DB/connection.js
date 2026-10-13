import mongoose from "mongoose";
import envConfig from "../Config/env.config.js";




const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.database.uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default  connectDB ;