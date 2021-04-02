// const parsePhoneNumber = require("libphonenumber-js")

// const phoneNumber = parsePhoneNumber("0750 706 9931", "GB")

// console.log(phoneNumber.formatInternational())
// console.log(phoneNumber.formatNational())
// console.log(phoneNumber.getURI())

const { PrismaClient } = require("@prisma/client")

let prisma = new PrismaClient()

const query = async () => {
  let results = await prisma.$queryRaw`SELECT * FROM "Contact";`

  console.log(results)
}

query()
