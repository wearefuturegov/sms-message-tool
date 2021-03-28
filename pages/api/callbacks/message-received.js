import prisma from "../../../lib/prisma"
import { verifyCallbackToken } from "../../../lib/middleware"

// https://docs.notifications.service.gov.uk/node.html#received-text-messages
export default async (req, res) => {
  if (req.method === "POST") {
    verifyCallbackToken(req, res)

    res.status(200).send("OK")
  }
}
