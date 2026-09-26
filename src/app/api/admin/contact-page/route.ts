import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let setting = await prisma.contactPageSetting.findFirst();
    if (!setting) {
      setting = await prisma.contactPageSetting.create({
        data: {
          heroKicker: 'CONTACT SECO LINE',
          heroTitleLine1: "Let's Build Something",
          heroTitleLine2Green: 'Stronger Together.',
          heroSubtitle: "Whether you're planning a new project, looking for specialized industrial support, or exploring a long-term partnership, our team is ready to understand your requirements and provide the right solution.",
          heroBgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
          heroOverlayImageUrl: '',
          enquiryKicker: 'GET IN TOUCH',
          enquiryTitleLine1: 'Start a Conversation About Your',
          enquiryTitleLine2Green: 'Next Project.',
          enquiryDescription: 'Connect with SECO LINE for contracting, construction, maintenance, manpower, logistics, equipment and industrial requirements across Saudi Arabia.',
          generalEmail: 'info@secoline.com.sa',
          callPhone: '+966 12 345 6789',
          headOfficeAddress: 'Building No. 2341, Salahuddin Al Ayyubi Street, Al Malaz District, Riyadh 12841, Saudi Arabia',
          workingArea: 'Serving projects across Saudi Arabia',
          mapKicker: 'LOCATION & HEADQUARTERS',
          mapTitleLine1: 'Visit Our Headquarters in',
          mapTitleLine2Green: 'Riyadh, Saudi Arabia.',
          mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231920.08945892582!2d46.54233777598822!3d24.72539828551403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa',
          directMapsUrl: 'https://maps.google.com/?q=Riyadh+Saudi+Arabia',
        },
      });
    }
    return NextResponse.json({ success: true, contactPage: setting });
  } catch (error: any) {
    console.error('Error fetching Contact Page settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const existing = await prisma.contactPageSetting.findFirst();

    const data = {
      heroKicker: body.heroKicker ?? 'CONTACT SECO LINE',
      heroTitleLine1: body.heroTitleLine1 ?? "Let's Build Something",
      heroTitleLine2Green: body.heroTitleLine2Green ?? 'Stronger Together.',
      heroSubtitle: body.heroSubtitle ?? '',
      heroBgImageUrl: body.heroBgImageUrl ?? '',
      heroOverlayImageUrl: body.heroOverlayImageUrl ?? '',

      enquiryKicker: body.enquiryKicker ?? 'GET IN TOUCH',
      enquiryTitleLine1: body.enquiryTitleLine1 ?? 'Start a Conversation About Your',
      enquiryTitleLine2Green: body.enquiryTitleLine2Green ?? 'Next Project.',
      enquiryDescription: body.enquiryDescription ?? '',

      generalEmail: body.generalEmail ?? 'info@secoline.com.sa',
      callPhone: body.callPhone ?? '+966 12 345 6789',
      headOfficeAddress: body.headOfficeAddress ?? '',
      workingArea: body.workingArea ?? 'Serving projects across Saudi Arabia',

      mapKicker: body.mapKicker ?? 'LOCATION & HEADQUARTERS',
      mapTitleLine1: body.mapTitleLine1 ?? 'Visit Our Headquarters in',
      mapTitleLine2Green: body.mapTitleLine2Green ?? 'Riyadh, Saudi Arabia.',
      mapEmbedUrl: body.mapEmbedUrl ?? '',
      directMapsUrl: body.directMapsUrl ?? '',
    };

    let contactPage;
    if (existing) {
      contactPage = await prisma.contactPageSetting.update({
        where: { id: existing.id },
        data,
      });
    } else {
      contactPage = await prisma.contactPageSetting.create({
        data,
      });
    }

    return NextResponse.json({ success: true, contactPage });
  } catch (error: any) {
    console.error('Error updating Contact Page settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
