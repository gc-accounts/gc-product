// app/api/payment/create-order/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const runtime = 'nodejs';

// Fail fast if env missing
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
if (!KEY_ID || !KEY_SECRET) {
  throw new Error('Missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET env vars.');
}

// Create SDK instance once
const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

// (Minimal) shape we need from the SDK
type RzpOrder = { id: string; amount: number; currency: string };

type CreateOrderBody = {
  amount: number;                 // in rupees from your UI
  coupon?: string;
  receipt?: string;
  notes?: Record<string, string>;
};

export async function POST(req: Request) {
  try {
    const { amount, coupon, receipt, notes }: CreateOrderBody = await req.json();

    const rupees = Number(amount);
    if (!Number.isFinite(rupees) || rupees <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // IMPORTANT:
    // Do NOT pass `payment_capture` here; it is not part of the typed order options.
    // If you include it, TypeScript chooses the callback overload and your `order`
    // becomes `Promise<...> & void`, causing the `id/amount/currency` errors.
    const order = (await razorpay.orders.create({
      amount: Math.round(rupees * 100), // rupees -> paise
      currency: 'INR',
      receipt: receipt || `os_${Date.now()}`,
      notes: { ...(notes || {}), coupon: coupon || '' },
    })) as RzpOrder;

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: any) {
    // Surface Razorpay error details if present
    const rzpMsg =
      err?.response?.error?.description ||
      err?.response?.error?.reason ||
      err?.message ||
      'Unknown error';

    console.error('Create order error:', {
      msg: err?.message,
      stack: err?.stack,
      response: err?.response,
    });

    return NextResponse.json(
      { error: 'Failed to create payment order', details: rzpMsg },
      { status: 500 }
    );
  }
}
