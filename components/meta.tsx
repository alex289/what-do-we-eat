import { useEffect, useState } from 'react';

import Head from 'next/head';

import { useTheme } from 'next-themes';

const Meta = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme } = useTheme();

  return (
    <Head>
      <title>What do we eat?</title>
      <meta name="title" content="What do we eat?" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      {mounted && (
        <meta
          name="theme-color"
          content={theme === 'light' ? '#f9fafb' : '#222222'}
        />
      )}
      <meta name="application-name" content="What do we eat" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="description" content="Web app to tell you what to eat" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="HandheldFriendly" content="true" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/icons/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/icons/favicon-16x16.png"
      />
      <link
        rel="preload"
        as="font"
        href="/static/fonts/ibm-plex-sans-var.woff2"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="What do we eat" />
      <meta
        property="og:description"
        content="Web app to tell you what to eat"
      />
      <meta property="og:site_name" content="What do we eat" />
      <meta property="og:url" content="https://what-do-we-eat.vercel.app" />
      <meta
        property="og:image"
        content="https://what-do-we-eat.vercel.app/api/og"
      />
      <link rel="canonical" href="https://what-do-we-eat.vercel.app" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="what-do-we-eat.vercel.app" />
      <meta
        property="twitter:url"
        content="https://what-do-we-eat.vercel.app"
      />
      <meta name="twitter:title" content="What do we eat" />
      <meta
        name="twitter:description"
        content="Web app to tell you what to eat"
      />
      <meta
        name="twitter:image"
        content="https://what-do-we-eat.vercel.app/api/og"
      />
    </Head>
  );
};

export default Meta;
