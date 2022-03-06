import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '/database/init'
import { ObjectId } from "mongodb"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user, token }) {
      // Get the transaction list for the providerAccount
      await clientPromise.then(async (client) => {
        const db = client.db()
        const transactions = db.collection("transactions")
        
        const trans = await transactions.find({ userId: user.id }).toArray()

        session.user.transactions = trans;
      })

      return session
    },
    async signIn({ user, account, profile }) {
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


      if (result) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  },
  adapter: MongoDBAdapter(clientPromise)
})