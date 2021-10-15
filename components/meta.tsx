import Head from 'next/head';

const Meta = () => (
  <Head>
    <title>What do we eat?</title>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
    <meta name="application-name" content="What do we eat" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="What do we eat" />
    <meta name="description" content="Web app to tell you what to eat" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-TileColor" content="#2B5797" />
    <meta name="msapplication-tap-highlight" content="no" />

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/icons/apple-touch-icon.png"
    />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" href="/static/icons/favicon.ico" />
    <link
      rel="preload"
      href="static/fonts/inter-var-latin.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="What do we eat" />
    <meta property="og:description" content="Web app to tell you what to eat" />
    <meta property="og:site_name" content="What do we eat" />
  </Head>
);

export default Meta;
