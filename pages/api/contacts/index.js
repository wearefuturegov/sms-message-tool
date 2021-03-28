import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"

export default async (req, res) => {
  await verifySession(req, res)

  let result

  if (req.method === "POST") {
    // CREATE
    const { number } = req.body
    result = await prisma.contact.create({
      data: {
        number,
      },
      include: {},
    })
  } else {
    // INDEX
    result = await prisma.contact.findMany({
      include: {
        received_messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    })
  }

  res.json(result)
}
