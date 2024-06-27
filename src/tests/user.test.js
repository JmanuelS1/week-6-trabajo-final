const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/users'
let TOKEN

beforeAll(async () => {
   const body = {
      email: "zarquiz@gmail.com",
      password: "zarquiz1234",
   }
   const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(body)

   TOKEN = res.body.token
})

test("POST -> 'BASE_URL', should return sendStatus 201, and res.body.firstName === user.firstName", async () => {
   const user = {
      firstName: "Jesus",
      lastName: "Carrasquilla",
      email: "jesus@gmail.com",
      password: "jesus1234",
      phone: "3424"
   }

   const res = await request(app)
      .post(BASE_URL)
      .send(user)

   expect(res.statusCode).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.firstName).toBe(user.firstName)
})

test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === ?", async () => {
   const res = await request(app)
      .get(BASE_URL)
      .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.statusCode).toBe(200)
})