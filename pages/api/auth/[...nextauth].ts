import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'auto',
    brandColor: '#c084fc',
    logo: 'https://what-do-we-eat.vercel.app/static/icons/favicon.ico',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user = token;
      session.isAdmin = token.email === process.env.ADMIN_EMAIL;
      return session;
    },
  },
});
