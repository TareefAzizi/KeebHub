import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Corrected here
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.token = account.id_token;
        token.userId = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log(token);
      session.accessToken = token.accessToken;
      session.token = token.token;
      session.id = token.userId;
      return session;
    },
  },
});
