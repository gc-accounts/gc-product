import { NextResponse } from 'next/server';

const REFRESH_TOKEN = "1000.1e5224e249752a08cbe7f5427e341a52.1aabae3b128779fb68810729b3a5b848";
const CLIENT_ID = "1000.Y45NHHWV1VOPLO8MYJRV6DFWGPJZ9O";
const CLIENT_SECRET = "bec6ccd02f45cd9a014bfb9be19119ac8fbfa39816";


const isStaging = process.env.VERCEL_ENV === 'stagging';

export async function POST() {
  try {
    const response = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
             refresh_token: REFRESH_TOKEN ,
        client_id:  CLIENT_ID ,
        client_secret:  CLIENT_SECRET ,
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
