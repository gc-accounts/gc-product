import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

    const res = await fetch(verifyURL, { method: 'POST' });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error('ReCAPTCHA verification failed:', err);
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 400 });
  }
}
