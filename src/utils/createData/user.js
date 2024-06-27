const User = require('../../models/User')

const user = async () => {
const body = {
   firstName: "Zarquiz",
   lastName: "Ortega",
   email: "zarquiz@gmail.com",
   password: "zarquiz1234",
   phone: "5620860"
}
await User.create(body)
}

module.exports = user