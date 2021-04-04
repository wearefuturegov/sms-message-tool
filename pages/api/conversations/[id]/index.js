import prisma from "../../../../lib/prisma"
import { verifySession } from "../../../../lib/middleware"

export default async (req, res) => {
  await verifySession(req, res)
  const { id, olderThan } = req.query

  let result

  const dbQuery = {
    take: 5,
    where: {
      contact: {
        id: Number(id),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }

  if (olderThan) {
    result = await prisma.message.findMany({
      skip: 1,
      cursor: {
        createdAt: olderThan,
      },
      ...dbQuery,
    })
  } else {
    result = await prisma.message.findMany({
      ...dbQuery,
    })
  }

  res.json(result)
}
