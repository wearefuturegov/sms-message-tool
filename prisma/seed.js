const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const main = async () => {
  await prisma.post.deleteMany({})
  await prisma.post.createMany({
    data: [
      {
        id: 1,
        title: "Foo",
        content: "Bar",
      },
      {
        id: 2,
        title: "Foo 2",
        content: "Bar 2",
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
