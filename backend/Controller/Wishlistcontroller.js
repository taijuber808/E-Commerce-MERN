import { Wishlist } from "../model/WishlistSchema.js";

// ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ userId });

  // If no wishlist, create new
  if (!wishlist) {
    wishlist = await Wishlist.create({
      userId,
      items: [{ productId }],
    });

    return res.json(wishlist);
  }

  // Check if product already exists
  const itemIndex = wishlist.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    wishlist.items.push({ productId });
    await wishlist.save();
  }

  res.json(wishlist);
};

// GET WISHLIST
export const getWishlist = async (req, res) => {
  const userId = req.user.id;

  const wishlist = await Wishlist.findOne({ userId }).populate(
    "items.productId",
  );

  res.json(wishlist);
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const wishlist = await Wishlist.findOne({ userId });

  wishlist.items = wishlist.items.filter(
    (item) => item.productId.toString() !== productId,
  );

  await wishlist.save();

  res.json(wishlist);
};