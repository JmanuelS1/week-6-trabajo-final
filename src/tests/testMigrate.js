const sequelize = require('../utils/connection')
const user = require('../utils/createData/user')
require('../models')

const testMigrate = async () => {

   try {
      await sequelize.sync({ force: true })
      console.log('se restablecio la base de datos 😎')

      await user()
      
      process.exit()
   } catch (error) {
      console.error(error)
   }
}

testMigrate()