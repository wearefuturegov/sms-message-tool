import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import Adapters from "next-auth/adapters"
import prisma from "../../../lib/prisma"

const authHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Email({
        sendVerificationRequest: async ({ url }) => {
          // for local development, just log the token url to the console
          return await console.log(url)
        },
      }),
    ],

    adapter: Adapters.Prisma.Adapter({ prisma }),
    secret: process.env.SESSION_SECRET,
  })

export default authHandler
