// Check /api/auth/signin

import NextAuth from "next-auth/next";
import prisma from  '../../../libs/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt'

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
          credentials : {
            email: { label: 'Email', type: 'text', placeholder: 'jsmith'},
            password: { label: 'Password', type: "password"},
            username: { label:"Username", type: 'text', placeholder:'Enter a useename'},
          },
          //  The login logic
          async authorize(credentials) {
            // Check to see if email or password is typed 
            if(!credentials.email || !credentials.password){
              throw new Error('missing field')
            }
            
            // Check to see if user exists
            const user = await prisma.user.findUnique({
              where: { email: credentials.email}
            })
          
            // if no user was found or user without hashed password
            // Email maybe found but should be encrypted
            // Because you can't use credential to login, use your OAuth to log in
            if(!user || !user?.hashedPassword ){
              throw new Error(' No user found')
            }

            //  Check if the password matches 
            const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

            // if password does not match
            if(!passwordMatch) throw new Error('incorrect password')

            return user;
          }
        }),
    ], 
    secret: process.env.SECRET,
    session: {
      strategy:'jwt',
    },
    // debug: process.env.NODE_ENV === "development"  
}

const handler = NextAuth(authOptions)

// You must export like a post request
export {handler as GET, handler as POST}
