import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import clientPromise from '/database/init'

export default NextAuth({
  secret: process.env.SECRET,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // Get the transaction list for the User
      await clientPromise.then(async (client) => {
        const db = client.db()
        const transactions = db.collection("transactions")

        const trans = await transactions.find({ userId: user.id }).toArray()

        session.user.transactions = trans;
      })

      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (email?.verificationRequest) return true;

      const hasLetters = /[A-z]/;
      const match = user.id.search(hasLetters);

      if (match === -1) {
        return true
      }

      const userAccountId = user.id;
      let result;
      
      await clientPromise.then(async (client) => {
        const db = client.db()
        const transactions = db.collection("transactions")

        result = await transactions.insertOne({
          userId: userAccountId,
          data: {
            action: 'Sign In'
          },
          createdAt: new Date()
        })

      })


      return true;
    }
  },
  adapter: MongoDBAdapter(clientPromise)
})