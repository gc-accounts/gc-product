import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY!;
  const MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT!;
  
  const testData = {
    amount: 1.18, // Your test amount with GST
    email: 'test@example.com',
    txnId: 'TXN123456789',
    productName: 'GC Data Science Bootcamp',
    firstName: 'Test User'
  };

  // Test the exact hash string
  const hashString = `${MERCHANT_KEY}|${testData.txnId}|${testData.amount}|${testData.productName}|${testData.firstName}|${testData.email}|||||||||||${MERCHANT_SALT}`;
  
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');

  return NextResponse.json({
    merchantKey: MERCHANT_KEY,
    merchantSalt: MERCHANT_SALT,
    hashString: hashString,
    generatedHash: hash,
    hashLength: hash.length
  });
}