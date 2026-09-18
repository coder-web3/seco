import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: name.trim().slice(0, 100),
        email: email.trim().toLowerCase().slice(0, 100),
        phone: phone ? String(phone).trim().slice(0, 50) : null,
        subject: subject ? String(subject).trim().slice(0, 200) : null,
        message: message.trim().slice(0, 5000),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received.',
      id: submission.id,
    });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting your message. Please try again.' },
      { status: 500 }
    );
  }
}
