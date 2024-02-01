
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { Session } from "next-auth"
import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "../actions/auth-actions"



export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@email.com" },
        password: { label: "Password", type: "password", placeholder:'********' }
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(credentials!.email as string, credentials!.password as string);
        if (user) 
          return user
        return null
      }
    }),
    google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    GitHub,
  ],

  session: {
    strategy: 'jwt'
  },
  
  callbacks: {
  
    async signIn({ user, account, profile, email, credentials }) {
        // console.log({user});
      return true;
    },
  
    async jwt({ token, user, account, profile }) {
        // console.log({ token });
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
      if ( dbUser?.isActive === false ) {
        throw Error('Usuario no está activo');
      }
  
      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id    = dbUser?.id ?? 'no-uuid';
  
      return token;
    },
  
    async session({ session, token, user }) {
        
      if ( session && session.user ) {
        session.user.roles = token.roles;
        session.user.id = token.id;
  
      }
  
      return session;
    }
  },
})




