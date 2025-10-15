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
  programName: string,
  paymentId?: string
) {
  try {
    const accessToken = await getAccessTokenForPayment();
    
    // Create JSON object instead of FormData
    const zohoData = {
      accessToken: accessToken,
      Email: email,
      Program: programName,
      Payment_Status: status,
      Payable_Amount: payableAmount,
      Effective_Bootcamp_Fee: effectiveFee,
      Business_Unit: 'GreyCampus',
      Source_Domain: 'GC Checkout Form',
      Payment_ID: paymentId || ''
    };

    console.log('📤 Sending payment status to Zoho:', zohoData);

    const response = await fetch(getApiUrl('/api/zoho/payment-status'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zohoData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Failed to update Zoho CRM:', errorText);
      throw new Error('Failed to update Zoho CRM');
    }
    
    const result = await response.json();
    console.log('✅ Zoho CRM updated successfully for program:', programName, result);
    return true;
  } catch (error) {
    console.error('💥 Error updating Zoho CRM:', error);
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
      
      // Return HTML directly for invalid data
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Payment Error - GreyCampus</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
          <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div class="text-yellow-500 text-6xl mb-4">⚠️</div>
            <h1 class="text-2xl font-bold text-gray-900 mb-3">Payment Processing Error</h1>
            <p class="text-gray-600 mb-6">We encountered an issue processing your payment data. Please contact support.</p>
            <div class="space-y-3">
              <a href="${baseUrl}" class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                Return to Home
              </a>
              <a href="${baseUrl}/contact" class="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium">
                Contact Support
              </a>
            </div>
          </div>
        </body>
        </html>
      `;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });
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

    // Extract program name from productinfo (sent by PayU)
    const programName = payuData.productinfo || 'GC Data Science Bootcamp';
    console.log('📚 Program Name:', programName);

    // Update Zoho CRM based on status
    if (status === 'success') {
      console.log('✅ Payment successful - Updating Zoho CRM');
      
      await updateZohoCRM(
        payuData.email as string || 'unknown', 
        'Paid', 
        payableAmount,
        effectiveFee,
        programName,
        payuData.txnid as string
      );

      // ✅ RETURN HTML DIRECTLY - NO REDIRECT
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Payment Successful - GreyCampus</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
          <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div class="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
            <p class="text-gray-600 mb-6">Thank you for your payment. Your enrollment in the ${programName} has been confirmed.</p>
            <p class="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded">Transaction ID: <span class="font-mono">${payuData.txnid}</span></p>
            <a href="${baseUrl}" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors">
              Return to Home
            </a>
          </div>
        </body>
        </html>
      `;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });

    } else {
      console.log('❌ Payment failed - Updating Zoho CRM');
      
      await updateZohoCRM(
        payuData.email as string || 'unknown', 
        'Failed', 
        payableAmount,
        effectiveFee,
        programName
      );
      
      // ✅ RETURN HTML DIRECTLY - NO REDIRECT
      const errorMsg = payuData.error_Message || 'We couldn\'t process your payment. Please check your payment details and try again.';
      
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Payment Failed - GreyCampus</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
          <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div class="mx-auto mb-6 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-3">Payment Failed</h1>
            <p class="text-gray-600 mb-6">${errorMsg}</p>
            <p class="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded">Transaction ID: <span class="font-mono">${payuData.txnid}</span></p>
            <div class="space-y-3">
              <a href="${baseUrl}" class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                Try Again
              </a>
              <a href="${baseUrl}/contact" class="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium">
                Contact Support
              </a>
            </div>
          </div>
        </body>
        </html>
      `;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

  } catch (error) {
    console.error('💥 Error in PayU callback:', error);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // ✅ RETURN HTML DIRECTLY FOR ERRORS - NO REDIRECT
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Error - GreyCampus</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div class="text-yellow-500 text-6xl mb-4">⚠️</div>
          <h1 class="text-2xl font-bold text-gray-900 mb-3">Payment Processing</h1>
          <p class="text-gray-600 mb-6">We're processing your payment. Please check your email for confirmation.</p>
          <a href="${baseUrl}" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Return to Home
          </a>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // ✅ RETURN HTML DIRECTLY FOR GET REQUESTS - NO REDIRECT
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invalid Request - GreyCampus</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-red-500 text-6xl mb-4">❌</div>
        <h1 class="text-2xl font-bold text-gray-900 mb-3">Invalid Request</h1>
        <p class="text-gray-600 mb-6">This page cannot be accessed directly. Please complete your payment through the checkout process.</p>
        <a href="${baseUrl}" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
          Return to Home
        </a>
      </div>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}