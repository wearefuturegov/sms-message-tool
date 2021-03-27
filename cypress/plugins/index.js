const seedDb = require("../../prisma/seed.js")

module.exports = (on, config) => {
  on("task", {
    resetDb: async () => {
      await seedDb()
      return true
    },
  })
}
