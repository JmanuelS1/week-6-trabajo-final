const catchError = require('../utils/catchError')
const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')

const getAll = catchError(async (req, res) => {
   const results = await Cart.findAll({ include: [User, Product] })
   return res.json(results)
})

const create = catchError(async (req, res) => {
   const { productId, quantity } = req.body
   const userId = req.user.id
   const product = await Product.findByPk(productId) //verificamos que exista el producto
   if (!product) return res.status(404).json({ message: 'Product not found' })
   //const body = { userId, quantity, productId }
   const result = await Cart.create({ userId, quantity, productId }) // o puede ser body(body)
   return res.status(201).json(result)
})

const getOne = catchError(async (req, res) => {
   const { id } = req.params
   const result = await Cart.findByPk(id, { include: [User, Product] })
   if (!result) return res.sendStatus(404)
   return res.json(result)
})

const remove = catchError(async (req, res) => {
   //const userId = req.user.id
   const { id } = req.params
   const result = await Cart.destroy({
      where: {
         id,
         userId: req.user.id
      } //podria ser solo userId
   })
   if (!result) return res.sendStatus(404)
   return res.sendStatus(204)
})

const update = catchError(async (req, res) => {
   const userId = req.user.id
   const { id } = req.params
   const { quantity } = req.body
   const result = await Cart.update(
      { quantity },
      {
         where: { id, userId },
         returning: true
      }
   )
   if (result[0] === 0) return res.sendStatus(404)
   return res.json(result[1][0])
})

module.exports = {
   getAll,
   create,
   getOne,
   remove,
   update
}