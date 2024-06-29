const Cart = require('./Cart')
const Category = require('./Category')
const Product = require('./Product')
const Purchase = require('./Purchase')
const User = require('./User')

require('./User')
require('./Category')

Product.belongsTo(Category) //! aqui se agrega categoryId al modelo Product
Category.hasMany(Product)

//Cart -> userId
Cart.belongsTo(User) //! aqui se crea userId al modelo cart
User.hasMany(Cart)

//Cart -> productId
Cart.belongsTo(Product) //! aqui se crea productId al modelo cart
Product.hasMany(Cart)

//Purchase -> userId
Purchase.belongsTo(User) //! aqui se crea userId al modelo Purchase
User.hasMany(Purchase)

//Purchase -> productId
Purchase.belongsTo(Product) //! aqui se crea productId al modelo Purchase
Product.hasMany(Purchase)



