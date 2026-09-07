import { Cart } from "../model/CartSchema.js";


// ADD TO CART
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });

  // If no cart, create new
  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId, quantity }],
    });

    return res.json(cart);
  }

  // Check if product already exists
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex > -1) {
    // Increase quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();

  res.json(cart);
};

// GET CART
export const getCart = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId }).populate("items.productId");

  res.json(cart);
};

// REMOVE ITEM
export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId,
  );

  await cart.save();

  res.json(cart);
};