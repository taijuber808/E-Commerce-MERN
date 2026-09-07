import { Order } from "../model/OrderSchema.js";
import { Cart } from "../model/CartSchema.js";

// PLACE ORDER
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, paymentMethod } = req.body;

    if (!address) {
      return res.status(400).json({
        status: false,
        message: "Address is required",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        status: false,
        message: "Payment method is required",
      });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Your cart is empty",
      });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      address,
      paymentMethod, // 👈 save kiya
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      status: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in placeOrder ${error.message}`,
    });
  }
};

// GET MY ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 }); // sabse naya order sabse upar

    res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in getMyOrders ${error.message}`,
    });
  }
};

// GET SINGLE ORDER DETAIL
export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.productId");

    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Order found",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in getSingleOrder ${error.message}`,
    });
  }
};
