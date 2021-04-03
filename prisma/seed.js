const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const main = async () => {
  await prisma.team.deleteMany({})
  await prisma.team.createMany({
    data: [
      {
        outOfHoursAutoreply: true,
        outOfHoursMessage:
          "We're out of the office right now. We will reply to your message as soon as we can. Our normal hours are 9-5 weekdays.",
      },
    ],
  })

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
