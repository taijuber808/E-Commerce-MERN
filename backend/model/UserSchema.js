import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);