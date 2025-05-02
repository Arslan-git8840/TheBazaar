import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
  