import mongoose from "mongoose";

export const mongoconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB  Connected");
  } catch (error) {
    console.log(error.message);
  }
};

