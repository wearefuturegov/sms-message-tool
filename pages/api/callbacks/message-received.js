import prisma from "../../../lib/prisma"
import { verifyCallbackToken } from "../../../lib/middleware"
import parsePhoneNumber from "libphonenumber-js"

// https://docs.notifications.service.gov.uk/node.html#received-text-messages
export default async (req, res) => {
  if (req.method === "POST") {
    verifyCallbackToken(req, res)
    const { id, source_number, message, date_received } = req.body
    const number = parsePhoneNumber(source_number, "GB").number
    await prisma.message.create({
      data: {
        body: message,
        direction: "INBOUND",
        completedAt: date_received,
        contact: {
          connectOrCreate: {
            create: {
              number,
            },
            where: {
              number,
            },
          },
        },
      },
    })
    res.status(200).send("OK")
  }
}
