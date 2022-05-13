import Script from 'next/script';

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            async
            defer
            data-website-id="b737e68a-8cc4-46b1-bac6-9d69828e8b91"
            src="https://alexanderkonietzko-analytics.vercel.app/umami.js"
          />
        </>
      )}
    </>
  );
};

export default Analytics;
