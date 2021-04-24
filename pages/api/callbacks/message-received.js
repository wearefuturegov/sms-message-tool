import prisma from "../../../lib/prisma"
import { errorHandler, verifyCallbackToken } from "../../../lib/middleware"
import parsePhoneNumber from "libphonenumber-js"
import { isOfficeHours } from "../../../lib/helpers"
import { sendMessage } from "../../../lib/notify"

// https://docs.notifications.service.gov.uk/node.html#received-text-messages
const handler = async (req, res) => {
  if (req.method === "POST") {
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

    const {
      outOfHoursAutoreply,
      outOfHoursMessage,
    } = await prisma.team.findFirst()

    // send out of hours reply
    if (outOfHoursAutoreply && !isOfficeHours()) {
      const result = await prisma.message.create({
        data: {
          body: outOfHoursMessage,
          direction: "OUTBOUND",
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
        include: {
          contact: true,
        },
      })

      await sendMessage(result.contact.number, outOfHoursMessage, result.id)
    }

    // trigger out-of-hours background sending
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/send-ooo`, {
      method: "POST",
      body: JSON.stringify({
        number,
      }),
    })

    res.status(200).send("OK")
  }
}

export default errorHandler(verifyCallbackToken(handler))
