import prisma from "../../../../lib/prisma"
import { verifySession } from "../../../../lib/middleware"

export default async (req, res) => {
  await verifySession(req, res)
  const { id, olderThan } = req.query

  const result = await prisma.contact.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  })
  res.json(result)
}
