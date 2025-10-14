import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const accessToken = formData.get('accessToken');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    const contactData = {
      data: [{
        Email: formData.get('Email'),
        Program: formData.get('Program'),
        Payment_Status: formData.get('Payment_Status'),
        Payable_Amount: formData.get('Payable_Amount'),
        Effective_Bootcamp_Fee: formData.get('Effective_Bootcamp_Fee'), // Fixed field name
        Business_Unit: formData.get('Business_Unit'), // Fixed field name
        Source_Domain: formData.get('Source_Domain'),
        Payment_ID: formData.get('Payment_ID'), // Add this field
        duplicate_check_fields: ['Email'],
        trigger: ['workflow']
      }]
    };

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
      console.error('Zoho API error:', errorData);
      throw new Error(errorData.message || 'Failed to create or update contact');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating/updating contact:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create or update contact' },
      { status: 500 }
    );
  }
}