import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google"
import prisma from "./lib/prisma"


export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    GitHub
  ],
  
})

