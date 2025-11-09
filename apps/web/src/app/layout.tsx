import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GJYL - Chat, Create, Connect',
  description: 'Privacy-respecting social platform with chat, feed, and live streaming',
  keywords: ['chat', 'social', 'feed', 'live streaming', 'privacy'],
  authors: [{ name: 'GJYL Team' }],
  openGraph: {
    type: 'website',
    title: 'GJYL - Chat, Create, Connect',
    description: 'Privacy-respecting social platform with chat, feed, and live streaming',
    siteName: 'GJYL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GJYL - Chat, Create, Connect',
    description: 'Privacy-respecting social platform with chat, feed, and live streaming',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
