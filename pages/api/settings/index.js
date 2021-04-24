import prisma from "../../../lib/prisma"
import { verifySession, errorHandler } from "../../../lib/middleware"
import { settingsSchema } from "../../../lib/validators"

const handler = async (req, res, session) => {
  if (req.method === "POST") {
    const {
      teamId,
      useSignature,
      signature,
      outOfHoursAutoreply,
      outOfHoursMessage,
      messageTemplates,
    } = JSON.parse(req.body)

    await settingsSchema.validate({
      teamId,
      useSignature,
      signature,
      outOfHoursAutoreply,
      outOfHoursMessage,
      messageTemplates,
    })

    Promise.all([
      prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          useSignature,
          signature,
        },
      }),
      prisma.team.update({
        where: {
          id: Number(teamId),
        },
        data: {
          outOfHoursAutoreply,
          outOfHoursMessage,
          messageTemplates,
        },
      }),
    ]).then(results => res.json(results))
  } else {
    const team = await prisma.team.findFirst()
    res.json(team)
  }
}

export default errorHandler(verifySession(handler))
