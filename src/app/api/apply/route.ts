
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'edge';
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const age = formData.get('age') as string;
    const height = formData.get('height') as string;
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;
    const instagram = formData.get('instagram') as string;
    const message = formData.get('message') as string;

    // Create application
    const application = await db.application.create({
      data: {
        name,
        email,
        phone,
        age,
        height,
        city,
        country,
        instagram,
        message,
        status: 'pending',
      },
    });

    // Handle file uploads — map form keys to DB type values
    const fileUploads: { formKey: string; dbType: string }[] = [
      { formKey: 'headshot', dbType: 'headshot' },
      { formKey: 'sideProfile', dbType: 'side' },
      { formKey: 'fullBody', dbType: 'fullbody' },
    ];

    const photoUrls: string[] = [];
    for (const { formKey, dbType } of fileUploads) {
      const file = formData.get(formKey) as File | null;
      if (file && file.size > 0) {
        // In production, upload to cloud storage (e.g. S3, Cloudinary)
        const imageUrl = `/uploads/${application.id}/${dbType}-${file.name}`;
        photoUrls.push(`${dbType.toUpperCase()}: ${imageUrl}`);

        await db.applicationPhoto.create({
          data: {
            applicationId: application.id,
            imageUrl,
            type: dbType,
          },
        });
      }
    }

    // Forward securely to Formspree Server-to-Server
    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/mjgpzrky';
    try {
      const formspreeResponse = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          age,
          height,
          city,
          country,
          instagram,
          message,
          photoLinks: photoUrls.join(' | '),
          note: `New application received! Photos stored in DB. Links: ${photoUrls.length > 0 ? photoUrls.join(', ') : 'None'}`
        }),
      });
      if (!formspreeResponse.ok) {
        console.error('Formspree Apply returned an error:', await formspreeResponse.text());
        throw new Error('Formspree forwarding failed');
      }
    } catch (e) {
      console.error('Error contacting custom Formspree URL for Apply:', e);
      // We will gracefully continue and return success to the user so they don't see an error if Formspree is temporarily down, since we saved to the db.
    }

    return NextResponse.json({ success: true, id: application.id });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
