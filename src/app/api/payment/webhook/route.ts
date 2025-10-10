// app/api/payment/webhook/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';

export const runtime = 'nodejs';

const KEY_ID = process.env.RAZORPAY_KEY_ID!;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

const rzp = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

export async function POST(req: Request) {
  const sig = req.headers.get('x-razorpay-signature') || '';
  const raw = await req.text();

  // 1) Verify signature
  const expected = crypto.createHmac('sha256', WEBHOOK_SECRET).update(raw).digest('hex');
  if (expected !== sig) {
    console.error('[WEBHOOK] Invalid signature', { expected, sig });
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const evt = JSON.parse(raw);
  const eventName = evt?.event;
  console.log('[WEBHOOK] Event received:', eventName);

  try {
    // 2) Auto-capture on payment.authorized (most reliable)
    if (eventName === 'payment.authorized') {
      const p = evt.payload.payment?.entity;
      if (!p?.id) {
        console.error('[WEBHOOK] Missing payment entity on payment.authorized', evt);
        return NextResponse.json({ ok: true });
      }

      // Fetch latest status to be safe
      const current = await rzp.payments.fetch(p.id);
      console.log('[WEBHOOK] Current status before capture:', p.id, current.status);

      if (current.status !== 'captured') {
        // amount must be in paise, currency must match
        const captureRes = await rzp.payments.capture(p.id, Number(p.amount), p.currency || 'INR');
        console.log('[WEBHOOK] Capture result:', captureRes?.status, captureRes?.id);
      } else {
        console.log('[WEBHOOK] Already captured, skipping:', p.id);
      }
    }

    // 3) (Optional) confirm capture on payment.captured (for CRM updates etc.)
    if (eventName === 'payment.captured') {
      const p = evt.payload.payment?.entity;
      console.log('[WEBHOOK] payment.captured for:', p?.id, p?.status);
      // TODO: upsert to Zoho here (idempotent)
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    // Log Razorpay errors clearly
    const detail =
      e?.error?.description ||
      e?.response?.body ||
      e?.message ||
      'unknown capture error';

    console.error('[WEBHOOK] Capture error:', detail);
    // Return 200 so Razorpay doesn’t hammer retries while you investigate
    return NextResponse.json({ ok: true, note: 'error logged' });
  }
}
