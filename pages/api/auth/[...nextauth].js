import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import Adapters from "next-auth/adapters"
import prisma from "../../../lib/prisma"

const authHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],

    callbacks: {
      // include user id in the session object
      async session(session, user) {
        session.user.id = user.id
        return session
      },
    },

    adapter: Adapters.Prisma.Adapter({ prisma }),
    secret: process.env.SESSION_SECRET,
  })

export default authHandler
