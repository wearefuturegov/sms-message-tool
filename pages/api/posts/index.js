import prisma from "../../../lib/prisma"
import { getSession } from "next-auth/client"

export default async (req, res) => {
  let result
  if (req.method === "POST") {
    // CREATE
    const session = await getSession({ req })
    if (session) {
      const { title, content } = req.body
      result = await prisma.post.create({
        data: {
          title: title,
          content: content,
        },
      })
    } else {
      res.status(401)
    }
  } else {
    // INDEX
    result = await prisma.post.findMany()
  }

  res.json(result)
}
