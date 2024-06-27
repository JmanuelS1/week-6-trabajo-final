const Category = require('./Category')
const Product = require('./Product')

require('./User')
require('./Category')

Product.belongsTo(Category)
Category.hasMany(Product)