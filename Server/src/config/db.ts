import mongoose from "mongoose";

const connectDB = async () => {
  try {

    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) {
      console.log("MongoDB URI not found in environment variables");
      return;
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB Connection Problem:", error);
  }
};

export default connectDB;
