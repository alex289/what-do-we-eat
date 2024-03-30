import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import clsx from 'clsx';

import Analytics from '@/components/analytics';
import Layout from '@/components/layout';

import { type Metadata, type Viewport } from 'next';
import { getServerAuthSession } from '@/lib/auth';
import { ThemeProvider } from 'next-themes';

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL('https://what-do-we-eat.vercel.app'),
    title: {
      default: 'What do we eat?',
      template: '%s | What do we eat?',
    },
    applicationName: 'What do we eat',
    description: 'Web app to tell you what to eat',
    openGraph: {
      title: 'What do we eat?',
      description: 'Web app to tell you what to eat',
      url: 'https://what-do-we-eat.vercel.app',
      siteName: 'What do we eat',
      images: [
        {
          url: `https://what-do-we-eat.vercel.app/api/og`,
          width: 1920,
          height: 1080,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: 'What do we eat',
      card: 'summary_large_image',
      description: 'Web app to tell you what to eat',
      images: ['https://what-do-we-eat.vercel.app/api/og'],
    },
    icons: {
      shortcut: '/favicon.ico',
      apple: '/static/icons/apple-touch-icon.png',
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/static/icons/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/static/icons/favicon-16x16.png',
        },
      ],
    },
    manifest: '/site.webmanifest',
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#222222' },
  ],
  initialScale: 1,
  width: 'device-width',
  colorScheme: 'light dark',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className={clsx(GeistSans.variable, GeistMono.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Layout session={session}>
            <Analytics />
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
