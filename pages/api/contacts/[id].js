import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"
import parsePhoneNumber from "libphonenumber-js"

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      // UPDATE
      await verifySession(req, res)

      const id = req.query.id
      const { nickname, number } = JSON.parse(req.body)
      const result = await prisma.contact.update({
        data: {
          nickname,
          number: parsePhoneNumber(number, "GB").number,
        },
        where: {
          id: Number(id),
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
