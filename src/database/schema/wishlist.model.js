import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  });
  
  export const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
  