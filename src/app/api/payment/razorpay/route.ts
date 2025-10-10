import { NextRequest, NextResponse } from 'next/server';

const RAZORPAY_KEY_ID = "rzp_live_RD2npv6XGiXhs8";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Explicitly export the HTTP methods
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, name, email, phone, courseName } = body;

    if (!amount || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create order on Razorpay
    const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to paise and ensure it's an integer
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          name,
          email,
          phone,
          courseName
        }
      })
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      console.error('Razorpay API Error:', errorData);
      throw new Error(errorData.error?.description || 'Failed to create Razorpay order');
    }

    const orderData = await orderResponse.json();
    return NextResponse.json(orderData);
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount } = await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const crypto = require('crypto');
    const signature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    const isValid = signature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 'success', response: 'Paid' });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
} 