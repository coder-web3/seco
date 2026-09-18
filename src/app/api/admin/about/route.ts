import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const about = await prisma.aboutPage.findFirst();
  return NextResponse.json({ success: true, about });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const about = await prisma.aboutPage.upsert({
      where: { id: 1 },
      update: {
        heading: data.heading,
        subheading: data.subheading,
        story: data.story,
        mission: data.mission,
        vision: data.vision,
        values: data.values,
        imageUrl: data.imageUrl,
        secondaryImageUrl: data.secondaryImageUrl,
        experienceYears: data.experienceYears,
        statsJson: data.statsJson,
      },
      create: {
        id: 1,
        heading: data.heading || 'About Us',
        subheading: data.subheading,
        story: data.story,
        mission: data.mission,
        vision: data.vision,
        values: data.values,
        imageUrl: data.imageUrl,
        secondaryImageUrl: data.secondaryImageUrl,
        experienceYears: data.experienceYears,
        statsJson: data.statsJson,
      },
    });
    return NextResponse.json({ success: true, about });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update about page' }, { status: 500 });
  }
}
