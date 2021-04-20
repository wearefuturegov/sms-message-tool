import prisma from "../../../../lib/prisma"
import { verifySession, errorHandler } from "../../../../lib/middleware"

const handler = async (req, res) => {
  const { id, cursor } = req.query

  const perPage = 20

  const result = await prisma.message.findMany({
    where: {
      contact: {
        id: Number(id),
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: perPage + 1,
    // handle pagination
    cursor: cursor
      ? {
          id: Number(cursor),
        }
      : undefined,
  })

  // if we got fewer than the requested number of results, we're on the final page
  let onLastPage = result.length < perPage
  let nextCursor

  // remove the extra result and store its id, if it exists
  if (!onLastPage) {
    nextCursor = result[result.length - 1].id
    result.pop()
  }

  res.json({
    nextCursor: onLastPage
      ? null
      : `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}?cursor=${nextCursor}`,
    messages: result,
  })
}

export default errorHandler(verifySession(handler))
