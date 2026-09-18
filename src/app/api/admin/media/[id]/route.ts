import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { deleteMediaFile } from '@/lib/media';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await Promise.resolve(params);
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const success = await deleteMediaFile(id);
    if (!success) {
      return NextResponse.json({ error: 'Media file not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Media file deleted' });
  } catch (error: any) {
    console.error('Failed to delete media:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
