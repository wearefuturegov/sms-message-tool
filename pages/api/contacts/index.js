import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"
import parsePhoneNumber from "libphonenumber-js"

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      // CREATE

      await verifySession(req, res)

      const { number } = JSON.parse(req.body)
      const result = await prisma.contact.create({
        data: {
          number: parsePhoneNumber(number, "GB").number,
        },
      })
      res.json(result)
    } else {
      res.status(401)
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
