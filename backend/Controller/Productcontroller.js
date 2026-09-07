import { Product } from "../model/ProductSchema.js";

//create Product
export const createProduct = async (req, res) => {
    try {
        const {name, price, description , image, categoryID} = req.body;
        if(!name || !price || !description || !image || !categoryID){
            return res.status(400).json({
                status:false,
                message:"all fields are required",
            })
        }
        const product1 = await Product.create({
            name,
            price,
            description,
            image,
            categoryID
        })

        res.status(201).json({
            status:true,
            message:"Product added successfully",
            data:product1
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:`Error in creating Product ${error.message}`
        })
    }
}

// Bulk Create Products
export const bulkCreateProduct = async (req, res) => {
    try {
        const products = req.body;

        // Check if array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Please provide an array of products"
            });
        }

        // Validate each product
        for (let item of products) {
            const { name, price, description, image, categoryID } = item;
            if (!name || !price || !description || !image || !categoryID) {
                return res.status(400).json({
                    status: false,
                    message: "All fields are required in each product"
                });
            }
        }

        // Insert many
        const createdProducts = await Product.insertMany(products);

        res.status(201).json({
            status: true,
            message: "Bulk products added successfully",
            total: createdProducts.length,
            data: createdProducts
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: `Error in bulkCreateProduct ${error.message}`
        });
    }
};

//Get Product By category
export const getProductByCategory = async(req, res) => {
    try {
        const {id} = req.params;
        const product1 = await Product.find({categoryID: id});
        if(!product1){
            res.status(404).json({
                message:"Product Not Found"
            })
        }
        res.status(200).json({
            status:true,
            message:"Product Found",
            data:product1
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:`Error in getProductByCategory${error.message}`
        })
    }
}

//Get Single Product
export const getSingleProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const product1 = await Product.findById(id);
        if(!product1) {
            return res.status(404).json({
                message:"product not Found"
            })
        } 

        res.status(200).json({
            status:true,
            message:"Product found",
            data:product1
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:`error in getSingleProduct ${error.message}`
        })
    }
}

// Get All Products
export const getAllProduct = async ( req,res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            status: true,
            message: "All Products Found",
            data: products
        });

    } catch (error) {
        res.status(400).json({
            status: false,
            message: `Error in getAllProduct ${error.message}`
        });
    }
};