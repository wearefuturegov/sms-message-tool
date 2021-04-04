import prisma from "../../../../lib/prisma"
import { verifySession } from "../../../../lib/middleware"

export default async (req, res) => {
  await verifySession(req, res)
  const { id, olderThan } = req.query

  const result = await prisma.message.findMany({
    where: {
      contact: {
        id: Number(id),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    // handle pagination
    skip: olderThan ? 1 : 0,
    cursor: olderThan
      ? {
          createdAt: olderThan,
        }
      : false,
  })

  res.json(result)
}
