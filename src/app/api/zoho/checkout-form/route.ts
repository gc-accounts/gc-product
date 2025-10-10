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
    First_Name: formData.get('First Name'),
    Last_Name: formData.get('Last Name'),
    Email: formData.get('Email'),
    Phone: formData.get('Phone'),
    Program: formData.get('Program'),
    Payable_Amount: formData.get('Payable Amount'), // ✅ added
    Payment_ID: formData.get('Payment ID'), // ✅ added
    Other_Country: formData.get('Country'),
    Year_Of_Graduation: formData.get('Year of Graduation'),
    ga_client_id: formData.get('Ga_client_id'),
    Business_Unit: formData.get('Business Unit'),
    Source_Domain: 'GC Checkout form',
    Device_Type1: formData.get('Device_Type1'),
    duplicate_check_fields: ['Email'],
    Coupon_Code: formData.get('Coupon Code'),
    Latest_Page_Seen: formData.get('First Page Seen'),
    Latest_Traffic_Source: formData.get('Original Traffic Source'),
    Latest_Traffic_Source_Drill_Down_1: formData.get('Original Traffic Source Drill-Down 1'),
    Latest_Traffic_Source_Drill_Down_2: formData.get('Original Traffic Source Drill-Down 2'),
    UTM_Term_First_Page_Seen: formData.get('UTM Term-First Page Seen'),
    UTM_Content_First_Page_Seen: formData.get('UTM Content-First Page Seen'),
    ads_gclid: formData.get('ads_gclid'),
  }],
  trigger: ['workflow'],
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
