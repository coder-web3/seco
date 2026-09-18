import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { saveMediaFile } from '@/lib/media';

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await saveMediaFile(
      buffer,
      file.name,
      file.type,
      altText
    );

    return NextResponse.json({ success: true, media: result });
  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload media file' },
      { status: 400 }
    );
  }
}
