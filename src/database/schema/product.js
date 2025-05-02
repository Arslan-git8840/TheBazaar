import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, lowercase: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  thumbnail: { type: String },
  category: { type: String },
  subcategory: { type: String },
  brand: { type: String },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
