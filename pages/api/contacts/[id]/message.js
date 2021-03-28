import prisma from "../../../../lib/prisma"
import { sendMessage } from "../../../../lib/notify"

export default async (req, res) => {
  if (req.method === "POST") {
    const { body } = JSON.parse(req.body)
    const { id } = req.query

    const result = await prisma.message.create({
      data: {
        body: body,
        recipient: {
          connect: {
            id: Number(id),
          },
        },
      },
      include: {
        recipient: true,
      },
    })

    res.json(result)
    // sendMessage()
  } else {
    res.status(401)
  }
}
