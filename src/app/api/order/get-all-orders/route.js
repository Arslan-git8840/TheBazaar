import { NextResponse } from 'next/server';
import { dbConnect } from '@/database/dbConnect';
import { Order } from '@/database/schema/order.model';
import { User } from '@/database/schema/user.model';
export async function GET() {
  try {
    
    await dbConnect();
    const orders = await Order.find({}).populate('user').populate('product');

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
