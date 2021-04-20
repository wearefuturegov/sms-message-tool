import prisma from "../../../../lib/prisma"
import { sendMessage } from "../../../../lib/notify"
import { verifySession, errorHandler } from "../../../../lib/middleware"

const handler = async (req, res, session) => {
  if (req.method === "POST") {
    let { body } = JSON.parse(req.body)
    const { id } = req.query

    if (session.user.useSignature) body = `${body} ${session.user.signature}`

    const result = await prisma.message.create({
      data: {
        body: body,
        direction: "OUTBOUND",
        contact: {
          connect: {
            id: Number(id),
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
      include: {
        contact: true,
      },
    })

    await sendMessage(result.contact.number, body, result.id)
    res.json(result)
  } else {
    res.status(400).json({
      error: "Method not supported on this endpoint",
    })
  }
}

export default errorHandler(verifySession(handler))
