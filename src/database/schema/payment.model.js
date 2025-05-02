import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    paymentMethod: { type: String, enum: ['stripe', 'paypal', 'cod'] },
    transactionId: String,
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    paidAt: Date,
  });
  
  export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
  