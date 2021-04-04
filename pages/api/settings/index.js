import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"

export default async (req, res) => {
  try {
    const session = await verifySession(req, res)

    if (req.method === "POST") {
      const {
        teamId,
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
    res.status(500).json({ error: e })
  }
}
