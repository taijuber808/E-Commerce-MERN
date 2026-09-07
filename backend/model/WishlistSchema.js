import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productSchema",
      },
    },
  ],
});

export const Wishlist = mongoose.model("Wishlist", WishlistSchema);