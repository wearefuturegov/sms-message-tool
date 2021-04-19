import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"

export default verifySession(async (req, res, session) => {
  try {
    if (req.method === "POST") {
      const {
        teamId,
        useSignature,
        signature,
        outOfHoursAutoreply,
        outOfHoursMessage,
        messageTemplates,
      } = JSON.parse(req.body)

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
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.toString() })
  }
})
