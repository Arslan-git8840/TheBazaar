import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
