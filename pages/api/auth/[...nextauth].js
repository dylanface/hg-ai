import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import clientPromise from '/database/init'

export default NextAuth({
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

        session.user.id = user.id;
        session.user.transactions = trans;
      })

      // Parse the provided user's full name into first and last name fields that exist within the session only
      if (user.name && !user.prefName) {
        const parse = user.name.split(" ");
        session.user.parsedName = {
          first: parse[0],
          last: parse[parse.length - 1] || undefined
        };
      } else if (user.prefName) {
        session.user.parsedName = user.prefName;
      }

      return session
    }
  },
  adapter: MongoDBAdapter(clientPromise),
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      const userAccountId = user.id;
      const actionText = isNewUser ? "Account Creation" : "Sign In";
      
      // Create a transaction for the user
      clientPromise.then(async (client) => {
        const db = client.db()
        const transactions = db.collection("transactions")

        transactions.insertOne({
          userId: userAccountId,
          data: {
            action: actionText,
          },
          createdAt: new Date()
        })

      });

    },
  }
})