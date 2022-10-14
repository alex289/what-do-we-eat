import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'auto',
    brandColor: '#c084fc',
    logo: 'https://what-do-we-eat.vercel.app/favicon.ico',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      token.image = token.picture;
      token.isAdmin = token.email === process.env.ADMIN_EMAIL;
      session.user = token as typeof session.user;

      return session;
    },
  },
};

export default NextAuth(authOptions);
