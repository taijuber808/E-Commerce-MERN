import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/userschema.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, gender, phone, dateOfBirth, address } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !phone ||
      !dateOfBirth ||
      !address
    ) {
      return res.status(400).json({
        status: false,
        message: "Please fill all fields",
      });
    }

    const userFind = await User.findOne({ email });

    if (userFind) {
      return res.status(409).json({
        status: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      gender,
      phone,
      dateOfBirth,
      address,
    });

    return res.status(201).json({
      status: true,
      message: "Registration Successfully",
      
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please enter email and password",
      });
    }

    const userFind = await User.findOne({ email });

    if (!userFind) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, userFind.password);

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: userFind._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: userFind._id,
          name: userFind.name,
          email: userFind.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
