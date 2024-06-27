const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/categories'
let TOKEN, categoryId

beforeAll(async () => {
   const body = {
      email: "zarquiz@gmail.com",
      password: "zarquiz1234",
   }
   const res = await request(app)
      .post('/api/v1/users/login')
      .send(body)

   TOKEN = res.body.token
})

test("POST -> 'BASE_URL', should return sendStatus 201, and res.body.name === category.name", async () => {
   const category = {
      name: "mobile"
   }
   
   const res = await request(app)
      .post(BASE_URL)
      .send(category)
      .set('Authorization', `Bearer ${TOKEN}`)

      categoryId = res.body.id

   expect(res.statusCode).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(category.name)
})

test("GET -> 'BASE_URL', should return status code 200, and res.body.name === category.name", async () =>{
   const res = await request(app)
   .get(BASE_URL)

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
})


test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
   const res = await request(app)
   .delete(`${BASE_URL}/${categoryId}`)
   .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.statusCode).toBe(204)
})