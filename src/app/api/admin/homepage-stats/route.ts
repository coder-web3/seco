import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let stats = await prisma.homepageStat.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  if (stats.length === 0) {
    try {
      await prisma.homepageStat.createMany({
        data: [
          { label: 'Projects Delivered', value: '250', suffix: '+', sortOrder: 1, isVisible: true },
          { label: 'Trusted Clients', value: '100', suffix: '+', sortOrder: 2, isVisible: true },
          { label: 'Cities Across KSA', value: '13', suffix: '+', sortOrder: 3, isVisible: true },
          { label: 'Years of Experience', value: '25', suffix: '+', sortOrder: 4, isVisible: true },
        ],
      });
      stats = await prisma.homepageStat.findMany({
        orderBy: { sortOrder: 'asc' },
      });
    } catch (e) {
      console.error('Failed to seed stats:', e);
    }
  }

  return NextResponse.json({ success: true, stats });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const stat = await prisma.homepageStat.create({
      data: {
        label: data.label,
        value: data.value,
        prefix: data.prefix || '',
        suffix: data.suffix || '',
        icon: data.icon || 'BarChart',
        sortOrder: Number(data.sortOrder) || 0,
        isVisible: data.isVisible !== false,
      },
    });
    return NextResponse.json({ success: true, stat });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create stat' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const stat = await prisma.homepageStat.update({
      where: { id: Number(data.id) },
      data: {
        label: data.label,
        value: data.value,
        prefix: data.prefix,
        suffix: data.suffix,
        icon: data.icon,
        sortOrder: Number(data.sortOrder),
        isVisible: data.isVisible,
      },
    });
    return NextResponse.json({ success: true, stat });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update stat' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  await prisma.homepageStat.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
