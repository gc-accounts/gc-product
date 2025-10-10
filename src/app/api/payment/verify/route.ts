import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      razorpay_amount,
    } = await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ status: 'failed', error: 'Missing required fields' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    const valid = expectedSignature === razorpay_signature;

    if (!valid) {
      return NextResponse.json({ status: 'failed', message: 'Invalid signature' });
    }

    // ✅ success response for frontend
    return NextResponse.json({
      status: 'success',
      message: 'Payment verified successfully',
      amount: razorpay_amount,
      payment_id: razorpay_payment_id,
    });
  } catch (e: any) {
    console.error('Verify error:', e);
    return NextResponse.json(
      { status: 'failed', message: e?.message || 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
