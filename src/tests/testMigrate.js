const sequelize = require('../utils/connection')
const user = require('../tests/createData/user')
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