require('../models')
const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')

const BASE_URL = '/api/v1/products'
let TOKEN, category, product, productId


afterAll(async () => {
   await category.destroy()
})

beforeAll(async () => {
   const body = {
      email: "zarquiz@gmail.com",
      password: "zarquiz1234",
   }
   const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(body)

   TOKEN = res.body.token

   category = await Category.create({
      name: "mobile"
   })

   product = {
      title: "Redmi 9c",
      description: "it´s a smartphone",
      price: 1000,
      categoryId: category.id
   }
})

test("POST -> 'BASE_URL', should return status code 201, and res.body.title === product.title", async () => {

   const res = await request(app)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(product)

   productId = res.body.id

   expect(res.statusCode).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.title).toBe(product.title)
   expect(res.body.categoryId).toBe(category.id)
})

test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {
   const res = await request(app)
      .get(BASE_URL)

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
})

test("GET -> 'BASE_URL/:id', should return status code 200, res.body.title === product.title", async () => {
   const res = await request(app)
      .get(`${BASE_URL}/${productId}`)

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.title).toBe(product.title)
})

test("PUT -> 'BASE_URL/:id', should return status code 200, res.body.title === productUpdate.title", async () => {
   const productUpdate = {
      title: "Redmi 9c updated"
   }
   const res = await request(app)
      .put(`${BASE_URL}/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(productUpdate)

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.title).toBe(productUpdate.title)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
   const res = await request(app)
   .delete(`${BASE_URL}/${productId}`)
   .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.statusCode).toBe(204)
})