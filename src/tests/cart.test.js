require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')


const BASE_URL = '/api/v1/cart'

let TOKEN, productUse, cart

beforeAll(async () => {
   const body = {
      email: "zarquiz@gmail.com",
      password: "zarquiz1234",
   }

   const res = await request(app)
      .post('/api/v1/users/login')
      .send(body)

   TOKEN = res.body.token

    productUse  = await Product.create({
      title: 'tv',
      description: 'tv smart 32"',
      price: 1000
   })

   cart = {
      quantity: 1,
      productId: productUse.id
   }
})

afterAll(async () => {
   await productUse.destroy()
})

test("POST --> 'BASE_URL', should return status code 201, and res.body.quantity === cart.quantity", async () => {
   const res = await request(app)
   .post(BASE_URL)
   .send(cart)
   .set('Authorization', `Bearer ${TOKEN}`)


   expect(res.statusCode).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.quantity).toBe(cart.quantity)
   expect(res.body.productId).toBe(cart.productId)
})

test("GET -> 'BASE_URL', should return status code 200 and res.body[0].quantity === cart.quantity", async () => {
   const res = await request(app)
   .get(BASE_URL)
   .set('Authorization', `Bearer ${TOKEN}`)


   expect(res.statusCode).toBe(200)
   expect(res.body[0].quantity).toBe(cart.quantity)
   expect(res.body[0].productId).toBe(cart.productId)
})