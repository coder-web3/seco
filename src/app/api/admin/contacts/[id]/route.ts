import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id: rawId } = await params;
  const id = Number(rawId);
  const { isRead } = await request.json();

  const submission = await prisma.contactSubmission.update({
    where: { id },
    data: { isRead: Boolean(isRead) },
  });
  return NextResponse.json({ success: true, submission });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id: rawId } = await params;
  const id = Number(rawId);
  await prisma.contactSubmission.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
