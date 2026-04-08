
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'edge';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // Forward securely to Formspree
    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_URL || 'https://formspree.io/f/xbdpbkvz';
    try {
      const formspreeResponse = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!formspreeResponse.ok) {
         console.error('Formspree returned an error:', await formspreeResponse.text());
      }
    } catch (e) {
      console.error('Error contacting custom Formspree URL for Contact:', e);
    }

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}
