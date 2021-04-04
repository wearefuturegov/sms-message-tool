import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"
import parsePhoneNumber from "libphonenumber-js"

export default async (req, res) => {
  try {
    await verifySession(req, res)

    let result
    const id = req.query.id

    if (req.method === "PUT") {
      // UPDATE
      const { nickname, number } = JSON.parse(req.body)
      result = await prisma.contact.update({
        data: {
          nickname,
          number: parsePhoneNumber(number, "GB").number,
        },
        where: {
          id: Number(id),
        },
      })
    } else {
      // SHOW
      result = await prisma.contact.findUnique({
        where: {
          id: Number(id),
        },
      })
    }

    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
