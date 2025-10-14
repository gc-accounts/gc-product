import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY!;
const MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT!;
const PAYU_BASE_URL = 'https://secure.payu.in';

export async function POST(req: Request) {
  try {
    const { amount, email, txnId, productName, firstName, phone } = await req.json();

    // Validate required fields
    if (!amount || !email || !txnId || !productName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ SIMPLIFIED: Use template literal with exact pipe count
    const hashString = `${MERCHANT_KEY}|${txnId}|${amount}|${productName}|${firstName || 'Customer'}|${email}|||||||||||${MERCHANT_SALT}`;

    console.log('🔑 Merchant Key:', MERCHANT_KEY);
    console.log('🧂 Merchant Salt:', MERCHANT_SALT);
    console.log('📝 Hash String:', hashString);
    
    // ✅ Generate hash
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');
    
    console.log('🔐 Generated Hash:', hash);
    console.log('📏 Hash Length:', hash.length);

    // Prepare PayU payment data
    const payuParams = {
      key: MERCHANT_KEY,
      txnid: txnId,
      amount: amount.toString(),
      productinfo: productName,
      firstname: firstName || 'Customer',
      email: email,
      phone: phone || '',
      surl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
      furl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/failure`,
      hash: hash,
      service_provider: 'payu_paisa'
    };

    console.log('📦 PayU Params (without hash):', { ...payuParams, hash: 'HIDDEN' });

    return NextResponse.json({
      success: true,
      action: `${PAYU_BASE_URL}/_payment`,
      params: payuParams
    });

  } catch (error) {
    console.error('❌ PayU order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayU order' },
      { status: 500 }
    );
  }
}