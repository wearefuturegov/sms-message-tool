import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"
import parsePhoneNumber from "libphonenumber-js"
import { contactSchema } from "../../../lib/validators"

export default verifySession(async (req, res) => {
  try {
    let result

    if (req.method === "POST") {
      // CREATE
      const { nickname, number, socialCareId } = JSON.parse(req.body)
      await contactSchema.validate({ nickname, number, socialCareId })
      result = await prisma.contact.create({
        data: {
          nickname,
          number: parsePhoneNumber(number, "GB").number,
          socialCareId,
        },
      })
      res.json(result)
    } else {
      // INDEX/SEARCH
      const { q } = req.query
      result = await prisma.contact.findMany({
        where: {
          OR: [
            {
              nickname: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              number: {
                // trim leading 0 to account for some phone formatting weirdness
                contains: q.startsWith("0") ? q.slice(1) : q,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      })
      res.json(result)
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.toString() })
  }
})
