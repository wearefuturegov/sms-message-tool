import prisma from "../../../lib/prisma"
import { verifySession } from "../../../lib/middleware"

export default verifySession(async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.toString() })
  }
})
