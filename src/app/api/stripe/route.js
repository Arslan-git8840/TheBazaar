import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { cartsItems } = body;

    // const body = {
    //   items: [
    //     {
    //       name: "Nike Air Max",
    //       thumbnail: "https://via.placeholder.com/150",
    //       price: 120,
    //       quantity: 1,
    //     },
    //     {
    //       name: "Adidas Ultraboost",
    //       thumbnail: "https://via.placeholder.com/150",
    //       price: 180,
    //       quantity: 2,
    //     },
    //   ],
    // };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartsItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.thumbnail],
          },
          unit_amount: item.totalPrice * 100, // Stripe expects amount in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/orders`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
    });

    return NextResponse.json({ session });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
