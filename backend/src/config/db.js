import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    console.log("🔌 connectDB function called");
    console.log("🔌 Connecting to MongoDB...");

    if (!ENV.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    throw error;
  }
};
