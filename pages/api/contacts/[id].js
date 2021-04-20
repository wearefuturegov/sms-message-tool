import parsePhoneNumber from "libphonenumber-js"
import prisma from "../../../lib/prisma"
import { verifySession, errorHandler } from "../../../lib/middleware"
import { getContactMetadata } from "../../../lib/socialCareApi"
import { contactSchema } from "../../../lib/validators"

const handler = async (req, res) => {
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
}

export default errorHandler(verifySession(handler))
