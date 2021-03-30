import prisma from "../../../../lib/prisma"
import { verifySession } from "../../../../lib/middleware"

export default async (req, res) => {
  await verifySession(req, res)

  let result

  const id = req.query.id
  result = await prisma.contact.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      messages: {
        include: {
          user: true,
        },
      },
    },
  })

  res.json(result)
}
