import prisma from "../../../../lib/prisma"
import { verifySession } from "../../../../lib/middleware"

export default async (req, res) => {
  // await verifySession(req, res)
  const { id, olderThan } = req.query

  let result

  if (olderThan) {
    result = await prisma.message.findMany({
      take: 5,
      skip: 1,
      cursor: {
        createdAt: olderThan,
      },
      where: {
        contact: {
          id: Number(id),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  } else {
    result = await prisma.message.findMany({
      take: 5,
      where: {
        contact: {
          id: Number(id),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  res.json(result)
}
