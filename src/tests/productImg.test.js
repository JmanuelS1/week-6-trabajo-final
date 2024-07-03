const request = require('supertest')
const app = require('../app')
const path = require('path')

const BASE_URL = '/api/v1/product_images'
const BASE_URL_AUTH = '/api/v1/users/login'
let token, imageId


beforeAll(async () => {
  const body = {
    email: "zarquiz@gmail.com",
    password: "zarquiz1234"
  }
  const res = await request(app)
    .post(BASE_URL_AUTH)
    .send(body)

  token = res.body.token

})

test('POST => BASE_URL should return statusCode 201, and res.body.filename and res.boby.url to be defined', async () => {

  const localImage = path.join(__dirname, 'createData', 'node.jpeg')

  const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${token}`)
    .attach('image', localImage)

  imageId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body.url).toBeDefined()
  expect(res.body.filename).toBeDefined()

})

test('DELETE => BASE_URL should return status 204', async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${imageId}`)
    .set('Authorization', `Bearer ${token}`)

  expect(res.statusCode).toBe(204)
})