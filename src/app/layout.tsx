import type { Metadata } from 'next';
import { Sora, Poppins } from 'next/font/google';
import './globals.css';
import { prisma } from '@/lib/prisma';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSetting.findFirst().catch(() => null);
  const favicon = settings?.faviconUrl || '/favicon.ico';

  return {
    title: settings?.siteName 
      ? `${settings.siteName} - ${settings.siteTagline || 'Saudi Arabian Construction & Contracting'}`
      : 'SECO LINE - Saudi Arabian Construction & Contracting',
    description: 'SECO LINE is a premier Saudi Arabian construction and contracting company building sustainable solutions for the Kingdom.',
    icons: {
      icon: [
        { url: favicon, type: 'image/png' },
        { url: favicon, sizes: 'any' },
      ],
      shortcut: favicon,
      apple: favicon,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSetting.findFirst().catch(() => null);
  const favicon = settings?.faviconUrl || '/favicon.ico';

  return (
    <html lang="en" className={`${sora.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href={favicon} sizes="any" />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
      </head>
      <body className="font-sans bg-slate-50 text-slate-900 min-h-screen selection:bg-emerald-500 selection:text-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
