import prisma from "../../../lib/prisma"
import { errorHandler, verifyCallbackToken } from "../../../lib/middleware"

// https://docs.notifications.service.gov.uk/node.html#delivery-receipts
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { reference, status, completed_at } = req.body

    await prisma.message.update({
      where: {
        id: Number(reference),
      },
      data: {
        status: status,
        completedAt: completed_at,
      },
    })

    res.status(200).send("OK")
  }
}

export default errorHandler(verifyCallbackToken(handler))
