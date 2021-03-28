import prisma from "../../../lib/prisma"

export default async (req, res) => {
  let result

  if (req.method === "POST") {
    // CREATE
    const { number } = req.body
    result = await prisma.contact.create({
      data: {
        number,
      },
    })
  } else {
    // INDEX
    result = await prisma.contact.findMany()
  }

  res.json(result)
}
