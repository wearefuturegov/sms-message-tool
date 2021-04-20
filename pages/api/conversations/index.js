import prisma from "../../../lib/prisma"
import { verifySession, errorHandler } from "../../../lib/middleware"

const handler = async (req, res) => {
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

export default errorHandler(verifySession(handler))
