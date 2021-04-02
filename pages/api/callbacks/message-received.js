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
  // }

  if (req.method === "POST") {
    verifyCallbackToken(req, res)

    const { id, source_number, message, date_received } = JSON.parse(req.body)

    await prisma.message.create({
      data: {
        body: message,
        direction: "INBOUND",
        contact: {
          connect: {
            // id: Number(id), ??????????????
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    })

    res.status(200).send("OK")
  }
}
