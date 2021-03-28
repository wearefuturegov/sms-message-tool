import prisma from "../../../../lib/prisma"

export default async (req, res) => {
  let result

  const id = req.query.id
  result = await prisma.contact.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      sent_messages: true,
      received_messages: true,
    },
  })

  res.json(result)
}
