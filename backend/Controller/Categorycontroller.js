import { Category } from "../model/CategorySchema.js";

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Name required",
      });
    }

    const CategoryExist = await Category.findOne({ name });

    if (CategoryExist) {
      return res.status(400).json({
        status: false,
        message: "Already Exist",
      });
    }

    const Category1 = await Category.create({
      name,
      image,
    });

    res.status(201).json({
      status: true,
      message: "Category Created Succcessfully",
      data: Category1,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: `Error in Creating Category ${error.message}`,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find().sort();
    res.status(200).json({
      status: true,
      message: "Get All Category",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: `Error in getAllCategory: ${error.message}`,
    });
  }
};
