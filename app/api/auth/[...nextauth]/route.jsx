// Check /api/auth/signin

import NextAuth from "next-auth/next";
import prisma from  '../../../libs/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";

//  The three providers
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
          name: "credentials",
          Credentials : {
            email: { label: 'Email', type: 'text', placeholder: 'jsmith'},
            password: { label: 'Password', type: "password"},
            username: { label:"Username", type: 'text', placeholder:'John smith'},
          },
          async authorize(credentials) {
            const user = {id: 1, name: 'J smith', email:'femi@gmail.com'};
            return user;
          }
        }),
    ], 
    secret: process.env.SECRET,
    session: {
      strategy:'jwt',
    },
    debug: process.env.NODE_ENV === "development"  
}

const handler = NextAuth(authOptions)

// You must export like a post request
export {handler as GET, handler as POST}
