import { Router } from "express";
import {
  createCategory,
  getAllCategory,
} from "../Controller/Categorycontroller.js";
import {
  bulkCreateProduct,
  createProduct,
  getAllProduct,
  getProductByCategory,
  getSingleProduct,
} from "../Controller/Productcontroller.js";
import { login, register } from "../Controller/authcontroller.js";
import { middleWare } from "../middelware/middelware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../Controller/Cartcontroller.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../Controller/Wishlistcontroller.js";
import {
  getMyOrders,
  getSingleOrder,
  placeOrder,
} from "../Controller/Ordercontroller.js";

export const routes = Router();

//Category Routes
routes.post("/createCategory", createCategory);
routes.get("/getAllCategory", getAllCategory);

//ProductsRoutes
routes.post("/createBulkProduct", bulkCreateProduct);
routes.post("/createProduct", createProduct);
routes.get("/getCategoryProduct/:id", getProductByCategory);
routes.get("/singleProduct/:id", getSingleProduct);
routes.get("/getAllProduct", getAllProduct);

//Auth Routes
routes.post("/register", register);
routes.post("/login", login);

//Cart Routes
routes.post("/cart/add", middleWare, addToCart);
routes.get("/cart", middleWare, getCart);
routes.post("/cart/remove", middleWare, removeFromCart);

//Whislist Routes
routes.post("/wishlist/add", middleWare, addToWishlist);
routes.get("/wishlist", middleWare, getWishlist);
routes.post("/wishlist/remove", middleWare, removeFromWishlist);

//Order Routes
routes.post("/order/place", middleWare, placeOrder);
routes.get("/order/my-orders", middleWare, getMyOrders);
routes.get("/order/:id", middleWare, getSingleOrder);
