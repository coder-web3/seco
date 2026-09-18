import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin, hashPassword } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // Allow user to edit their own profile, or superadmin to edit anyone
  if (admin.userId !== id && admin.role !== 'superadmin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await request.json();
    const updateData: any = {
      name: data.name,
      email: data.email?.toLowerCase().trim(),
    };

    if (admin.role === 'superadmin' && data.role) {
      updateData.role = data.role;
    }
    if (admin.role === 'superadmin' && typeof data.isActive === 'boolean') {
      updateData.isActive = data.isActive;
    }
    if (data.password && data.password.trim().length >= 6) {
      updateData.passwordHash = await hashPassword(data.password);
    }

    const user = await prisma.adminUser.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true, role: true, isActive: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!admin || admin.role !== 'superadmin') {
    return NextResponse.json({ error: 'Only superadmin can delete users' }, { status: 403 });
  }

  if (admin.userId === id) {
    return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
  }

  await prisma.adminUser.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
