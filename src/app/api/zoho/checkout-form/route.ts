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
        First_Name: formData.get('First_Name'), // ✅ Changed from 'First Name' to 'First_Name'
        Last_Name: formData.get('Last_Name'),   // ✅ Changed from 'Last Name' to 'Last_Name'
        Email: formData.get('Email'),
        Phone: formData.get('Phone'),
        Program: formData.get('Program'),
        Year_Of_Graduation: formData.get('Year_of_Graduation'), // ✅ Match the field name
        Other_Country: formData.get('Country'),
        ga_client_id: formData.get('Ga_client_id'),
        Business_Unit: formData.get('Business_Unit'), // ✅ Match the field name
        Device_Type1: formData.get('Device_Type1'),
        Latest_Page_Seen: formData.get('First_Page_Seen'), // ✅ Match the field name
        Latest_Traffic_Source: formData.get('Original_Traffic_Source'), // ✅ Match the field name
        Latest_Traffic_Source_Drill_Down_1: formData.get('Original_Traffic_Source_Drill_Down_1'), // ✅ Match the field name
        Latest_Traffic_Source_Drill_Down_2: formData.get('Original_Traffic_Source_Drill_Down_2'), // ✅ Match the field name
        UTM_Term_First_Page_Seen: formData.get('UTM_Term_First_Page_Seen'), // ✅ Match the field name
        UTM_Content_First_Page_Seen: formData.get('UTM_Content_First_Page_Seen'), // ✅ Match the field name
        ads_gclid: formData.get('ads_gclid'),
        Source_Domain: 'GC Checkout Form',
        duplicate_check_fields: ['Email'],
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