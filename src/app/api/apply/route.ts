import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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

    // Create application using Supabase SDK
    const { data: application, error: dbError } = await supabaseAdmin
      .from("Application")
      .insert({
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
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error in Apply route:', dbError);
      throw dbError;
    }

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
        // 🛠️ Industrial Storage Upload
        const fileExt = file.name.split('.').pop();
        const fileName = `${application.id}/${dbType}-${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { data: uploadData, error: uploadError } = await supabaseAdmin
          .storage
          .from('applications')
          .upload(filePath, file, {
            contentType: file.type,
            upsert: true
          });

        if (uploadError) {
          console.error(`❌ Upload error for ${dbType}:`, uploadError);
          continue;
        }

        // Get Public URL
        const { data: { publicUrl } } = supabaseAdmin
          .storage
          .from('applications')
          .getPublicUrl(filePath);

        photoUrls.push(`${dbType.toUpperCase()}: ${publicUrl}`);

        await supabaseAdmin.from("ApplicationPhoto").insert({
          applicationId: application.id,
          imageUrl: publicUrl,
          type: dbType,
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
      }
    } catch (e) {
      console.error('Error contacting custom Formspree URL for Apply:', e);
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
