import prisma from "../../../lib/prisma"
import { getSession } from "next-auth/client"

export default async (req, res) => {
  const id = req.query.id

  let post

  if (req.method === "DELETE") {
    // DESTROY
    const session = await getSession({ req })
    if (session) {
      post = await prisma.post.delete({
        where: { id: Number(id) },
      })
    } else {
      res.status(401)
    }
  } else if (req.method === "PUT") {
    // UPDATE
    const session = await getSession({ req })
    if (session) {
      const { title, content } = req.body
      post = await prisma.post.update({
        where: { id: Number(id) },
        data: { title: title, content: content },
      })
    } else {
      res.status(401)
    }
  } else {
    // SHOW
    post = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
    })
  }

  res.json(post)
}
