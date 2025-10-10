import { NextResponse } from 'next/server';

const REFRESH_TOKEN = "1000.c5ca5c54d34b1046be5377aa376f4417.6688379582481479ee0c881260b9a57b";
const CLIENT_ID = "1000.OSKLQI9J60HYGJ3NKR4E2LJKQTBA0X";
const CLIENT_SECRET = "d3bdad9ad5314be580eced067c4b6acaddd939a98d";




export async function POST() {
  try {
    const response = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token:  REFRESH_TOKEN ,
        client_id: CLIENT_ID ,
        client_secret: CLIENT_SECRET ,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh checkout token');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error refreshing checkout token:', error);
    return NextResponse.json(
      { error: 'Failed to refresh checkout token' },
      { status: 500 }
    );
  }
}
