import Script from 'next/script';

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            async
            defer
            data-website-id="b81d45ca-284a-4726-8f51-0aff58212749"
            src="https://alexanderkonietzko-analytics.vercel.app/umami.js"
          />
        </>
      )}
    </>
  );
};

export default Analytics;
