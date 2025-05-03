import { NextResponse } from 'next/server';
import { dbConnect } from '@/database/dbConnect';
import { Cart } from '@/database/schema/cart.model';
import { Product } from '@/database/schema/product';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userId, productId, quantity = 1 } = body;

    if (!userId || !productId) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // Optional: check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const price = product.price;
    const totalPrice = price * quantity;

    // Check if item already in cart
    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      // If already in cart, update quantity and total price
      cartItem.quantity += quantity;
      cartItem.totalPrice = cartItem.quantity * price;
      cartItem.updatedAt = Date.now();
      await cartItem.save();
    } else {
      // Create new cart entry
      cartItem = await Cart.create({
        user: userId,
        product: productId,
        quantity,
        totalPrice,
      });
    }

    return NextResponse.json({ success: true, cartItem }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
