import { NextResponse } from 'next/server';

const fieldMap: Record<string, string> = {
  'Total Website Visits': 'Total_Website_Visits',
  'Scroll End': 'Scroll_End',
  'Time Spent on Website': 'Time_Spent_on_Website',
  'Website Revisits': 'Website_Revisits',
};

async function getZohoAccessToken() {
  // Your token fetching code here (unchanged)
  const REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN || "1000.88dd3ca47fee4f42de4bcc7cf1adeefd.664f0f9983b8b29e69333c6fc7baf72d";
  const CLIENT_ID = process.env.ZOHO_CLIENT_ID || "1000.V6ZGOJHWW0P9T01QOKGVC3P9AK66JS";
  const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET || "31c0ad8b4a4d8f51e699fe2a5eb2503988f460c9c8";

  const res = await fetch('https://accounts.zoho.in/oauth/v2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: REFRESH_TOKEN,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.message || 'Failed to refresh token');
  }
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    let body: any = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = {};
      for (const [key, value] of formData as any) {
        body[key] = value;
      }
    }

    const email = body.Email;
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const accessToken = await getZohoAccessToken();

    const payloadRecord: Record<string, any> = {
      Email: email,
      duplicate_check_fields: ['Email'],
    };

    for (const label of Object.keys(fieldMap)) {
      payloadRecord[fieldMap[label]] = body[label] || '';
    }

    const metricsData = {
      data: [payloadRecord],
      trigger: ['workflow'],
    };

    const response = await fetch('https://www.zohoapis.in/crm/v2/Contacts/upsert', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metricsData),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Zoho upsert error', response.status, responseData);
      throw new Error(responseData.message || 'Failed to push metrics');
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error pushing user metrics:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to push metrics' }, { status: 500 });
  }
}
