import { NextResponse } from 'next/server';

const REFRESH_TOKEN = "1000.b0168dadce4478105eb3ff916e5ca268.ea5ef3b843654cfdc3066b7e780cfab4";
const CLIENT_ID = "1000.QX8X8B4I55CUFCNRUHXGB245G4OJJG";
const CLIENT_SECRET = "0eca064e4732d15e207347e504c3fdbd76d42f6e8f";

// const STAGING_REFRESH_TOKEN="1000.9e13daa22a7b8212d7d0becd45548da3.9cddbb1d86fd8781882a603d7c132e4c";
// const STAGING_CLIENT_ID= "1000.1CSE5U62XANASBC4N0XOKZL8RLMHED";
// const STAGING_CLIENT_SECRET= "70656be32a58dca8417ea9e9476f30066fc0b13628";


export async function POST() {
  try {
    const response = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token:  REFRESH_TOKEN ,
        client_id:  CLIENT_ID ,
        client_secret:  CLIENT_SECRET ,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 500 }
    );
  }
} 