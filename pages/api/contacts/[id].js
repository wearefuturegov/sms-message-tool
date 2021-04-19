import parsePhoneNumber from "libphonenumber-js"
import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"
import { getContactMetadata } from "../../../lib/socialCareApi"
import { contactSchema } from "../../../lib/validators"

export default verifySession(async (req, res) => {
  try {
    let result
    const id = req.query.id

    if (req.method === "PUT") {
      // UPDATE
      const { nickname, number, socialCareId } = JSON.parse(req.body)
      await contactSchema.validate({ nickname, number, socialCareId })
      result = await prisma.contact.update({
        data: {
          nickname,
          number: parsePhoneNumber(number, "GB").number,
          socialCareId,
        },
        where: {
          id: Number(id),
        },
      })

      res.json(result)
    } else {
      // SHOW
      result = await prisma.contact.findUnique({
        where: {
          id: Number(id),
        },
      })

      let metadata
      if (result.socialCareId)
        metadata = await getContactMetadata(result.socialCareId)

      res.json({
        ...result,
        metadata,
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.toString() })
  }
})
