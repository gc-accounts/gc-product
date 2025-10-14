import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getApiUrl } from '@/lib/api';

// Get access token for payment status updates
async function getAccessTokenForPayment() {
  try {
    const response = await fetch(getApiUrl('/api/auth/token-payment-status'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get access token for payment');
    }

    const data = await response.json();
    if (data?.access_token) {
      return data.access_token;
    } else {
      throw new Error('No access token in response');
    }
  } catch (error) {
    console.error('Error refreshing token for payment:', error);
    throw error;
  }
}

// Update Zoho CRM
async function updateZohoCRM(
  email: string, 
  status: 'Paid' | 'Failed', 
  payableAmount: string, 
  effectiveFee: string, 
  paymentId?: string
) {
  try {
    const accessToken = await getAccessTokenForPayment();
    
    const zohoPaymentFormData = new FormData();
    zohoPaymentFormData.append('accessToken', accessToken);
    zohoPaymentFormData.append('Email', email);
    zohoPaymentFormData.append('Program', 'GC Data Science Bootcamp');
    zohoPaymentFormData.append('Payment_Status', status);
    zohoPaymentFormData.append('Payable_Amount', payableAmount);
    zohoPaymentFormData.append('Effective_Bootcamp_Fee', effectiveFee);
    zohoPaymentFormData.append('Business_Unit', 'GreyCampus');
    zohoPaymentFormData.append('Source_Domain', 'GC Checkout Form');
    
    if (paymentId) {
      zohoPaymentFormData.append('Payment_ID', paymentId);
    }

    const response = await fetch(getApiUrl('/api/zoho/payment-status'), {
      method: 'POST',
      body: zohoPaymentFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to update Zoho CRM');
    }
    
    console.log('Zoho CRM updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating Zoho CRM:', error);
    return false;
  }
}

export async function POST(req: Request) {
  let payuData: Record<string, any> = {};
  
  try {
    // Parse the form data from PayU
    const formData = await req.formData();
    
    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      payuData[key] = value;
    }

    console.log('💰 PayU Callback Data Received:', payuData);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Validate required PayU data
    if (!payuData.status || !payuData.txnid) {
      console.error('❌ Missing required PayU data');
      return NextResponse.redirect(`${baseUrl}/payment-complete?status=failed&error=invalid_payment_data`);
    }

    const status = payuData.status as string;

    // Handle amounts for successful vs failed payments
    let payableAmount, effectiveFee;

    if (status === 'success') {
      // For successful payments, use the actual amount from PayU
      payableAmount = payuData.amount || '5900';
      effectiveFee = payuData.amount || '5000';
      console.log('✅ Successful Payment - Amount:', payableAmount);
    } else {
      // For failed payments, use '0' since no payment was made
      payableAmount = '0';
      effectiveFee = '0';
      console.log('❌ Failed Payment - Amount set to 0');
    }

    // Update Zoho CRM based on status
    if (status === 'success') {
      console.log('✅ Payment successful');
      
      await updateZohoCRM(
        payuData.email as string || 'unknown', 
        'Paid', 
        payableAmount,
        effectiveFee,
        payuData.txnid as string
      );

      // ✅ SIMPLE REDIRECT - NO COMPLEX URL OBJECTS
      return NextResponse.redirect(`${baseUrl}/payment-complete?status=success&txnid=${payuData.txnid}`);

    } else {
      console.log('❌ Payment failed');
      
      await updateZohoCRM(
        payuData.email as string || 'unknown', 
        'Failed', 
        payableAmount,
        effectiveFee
      );
      
      // ✅ SIMPLE REDIRECT - NO COMPLEX URL OBJECTS
      const errorMsg = payuData.error_Message || 'payment_failed';
      return NextResponse.redirect(`${baseUrl}/payment-complete?status=failed&txnid=${payuData.txnid}&error=${errorMsg}`);
    }

  } catch (error) {
    console.error('💥 Error in PayU callback:', error);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    return NextResponse.redirect(`${baseUrl}/payment-complete?status=failed&error=internal_server_error`);
  }
}

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return NextResponse.redirect(`${baseUrl}/payment-complete?status=failed&error=invalid_callback_method`);
}