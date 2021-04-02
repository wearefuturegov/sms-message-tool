import prisma from "../../../lib/prisma"
import { verifyCallbackToken } from "../../../lib/middleware"
import parsePhoneNumber from "libphonenumber-js"

// https://docs.notifications.service.gov.uk/node.html#received-text-messages
export default async (req, res) => {
  console.log(req.body)

  // {
  //   id: '98f497fd-a167-45a9-b6bb-d0a418bb13a1',
  //   source_number: '447507069931',
  //   destination_number: '07984404642',
  //   message: 'respond',
  //   date_received: '2021-04-01T23:00:49.000000Z'
  // }s

  if (req.method === "POST") {
    verifyCallbackToken(req, res)
    const { id, source_number, message, date_received } = req.body
    // 1. find contact by number
    const contact = await prisma.contact.findFirst({
      where: {
        number: parsePhoneNumber(source_number, "GB").number,
      },
      select: {
        id: true,
      },
    })
    // 2. add message to that contact and the current user
    await prisma.message.create({
      data: {
        body: message,
        direction: "INBOUND",
        completedAt: date_received,
        contact: {
          connect: {
            id: contact.id,
          },
        },
      },
    })
    res.status(200).send("OK")
  }
}
