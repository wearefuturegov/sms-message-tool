import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"

export default async (req, res) => {
  await verifySession(req, res)

  const conversations = await prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
    distinct: ["contactId"],
    include: {
      contact: true,
    },
  })
  const neverMessaged = await prisma.contact.findMany({
    where: {
      messages: { none: {} },
    },
  })

  res.json({
    conversations,
    neverMessaged,
  })
}
