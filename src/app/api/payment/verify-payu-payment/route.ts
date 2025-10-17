import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT!;

export async function POST(req: Request) {
  try {
    const paymentData = await req.json();

    // Verify PayU hash
    const hashString = 
      `${MERCHANT_SALT}|${paymentData.status}|||||||||||${paymentData.udf5}|${paymentData.udf4}|${paymentData.udf3}|${paymentData.udf2}|${paymentData.udf1}|${paymentData.email}|${paymentData.firstname}|${paymentData.productinfo}|${paymentData.amount}|${paymentData.txnid}|${paymentData.key}`;
    
const expectedHash = crypto.createHash('sha512').update(hashString, 'utf-8').digest('hex').toLowerCase();
    const isValid = expectedHash === paymentData.hash.toLowerCase();

    if (!isValid) {
      return NextResponse.json({
        status: 'failed',
        message: 'Invalid payment hash'
      });
    }

    return NextResponse.json({
      status: paymentData.status === 'success' ? 'success' : 'failed',
      payment_id: paymentData.txnid,
      amount: paymentData.amount,
      message: paymentData.status === 'success' ? 'Payment verified successfully' : 'Payment failed'
    });

  } catch (error) {
    console.error('PayU verification error:', error);
    return NextResponse.json(
      { status: 'failed', message: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}