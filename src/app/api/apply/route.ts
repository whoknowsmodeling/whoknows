import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

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

    for (const { formKey, dbType } of fileUploads) {
      const file = formData.get(formKey) as File | null;
      if (file && file.size > 0) {
        // In production, upload to cloud storage (e.g. S3, Cloudinary)
        const imageUrl = `/uploads/${application.id}/${dbType}-${file.name}`;

        await db.applicationPhoto.create({
          data: {
            applicationId: application.id,
            imageUrl,
            type: dbType,
          },
        });
      }
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
