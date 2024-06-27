const sequelize = require('../utils/connection')
require('../models')

const testMigrate = async () => {

   try {
      await sequelize.sync({ force: true })
      console.log('se restablecio la base de datos ✅')
      
      process.exit()
   } catch (error) {
      console.error(error)
   }
}

testMigrate()