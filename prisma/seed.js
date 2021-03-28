const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const main = async () => {
  await prisma.contact.deleteMany({})
  await prisma.contact.createMany({
    data: [
      {
        number: "07777777777",
      },
      {
        number: "07507069931",
      },
    ],
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

module.exports = main
