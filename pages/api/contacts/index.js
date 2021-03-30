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
    result = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      distinct: ["contactId"],
      include: {
        contact: true,
      },
    })
  }

  res.json(result)
}
