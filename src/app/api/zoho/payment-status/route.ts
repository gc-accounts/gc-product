import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data directly
    const requestBody = await request.json();
    
    const { 
      accessToken,
      Email,
      Program,
      Payment_Status,
      Payable_Amount,
      Effective_Bootcamp_Fee,
      Business_Unit,
      Source_Domain,
      Payment_ID 
    } = requestBody;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    const contactData = {
      data: [{
        Email: Email,
        Program: Program,
        Payment_Status: Payment_Status,
        Payable_Amount: Payable_Amount,
        Effective_Bootcamp_Fee: Effective_Bootcamp_Fee,
        Business_Unit: Business_Unit,
        Source_Domain: Source_Domain,
        Payment_ID: Payment_ID,
        duplicate_check_fields: ['Email'],
        trigger: ['workflow']
      }]
    };

    console.log('📤 Sending to Zoho CRM:', contactData);

    const response = await fetch('https://www.zohoapis.in/crm/v2/Contacts/upsert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Zoho API error:', errorData);
      throw new Error(errorData.message || 'Failed to create or update contact');
    }

    const data = await response.json();
    console.log('✅ Zoho CRM update successful:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('💥 Error creating/updating contact:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create or update contact' },
      { status: 500 }
    );
  }
}