import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY!;
const MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT!;
const PAYU_BASE_URL = 'https://secure.payu.in';

export async function POST(req: Request) {
  try {
    const { amount, email, txnId, productName, firstName, phone, userCountry, currency } = await req.json();

    // Validate required fields
    if (!amount || !email || !txnId || !productName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine currency and amount based on country
    let finalCurrency = currency || 'INR'; // Default to INR
    let finalAmount = amount;

    console.log('💰 Payment Details:', {
      userCountry,
      currency: finalCurrency,
      amount: finalAmount
    });

    // Generate hash with currency parameter
    const hashString = `${MERCHANT_KEY}|${txnId}|${finalAmount}|${productName}|${firstName || 'Customer'}|${email}|||||||||||${MERCHANT_SALT}`;
    
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/callback`;

    const payuParams = {
      key: MERCHANT_KEY,
      txnid: txnId,
      amount: finalAmount.toString(),
      productinfo: productName,
      firstname: firstName || 'Customer',
      email: email,
      phone: phone || '',
      surl: callbackUrl,
      furl: callbackUrl,
      hash: hash,
      service_provider: 'payu_paisa',
      currency: finalCurrency // Add currency parameter for PayU
    };

    console.log('📦 PayU Params:', { ...payuParams, hash: 'HIDDEN' });

    return NextResponse.json({
      success: true,
      action: `${PAYU_BASE_URL}/_payment`,
      params: payuParams,
      currency: finalCurrency,
      amount: finalAmount
    });

  } catch (error) {
    console.error('❌ PayU order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayU order' },
      { status: 500 }
    );
  }
}