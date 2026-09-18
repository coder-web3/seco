import type { Metadata } from 'next';
import { Sora, Poppins } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'SECO LINE - Saudi Arabian Construction & Contracting',
  description: 'SECO LINE is a premier Saudi Arabian construction and contracting company building sustainable solutions for the Kingdom.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-slate-50 text-slate-900 min-h-screen selection:bg-emerald-500 selection:text-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
