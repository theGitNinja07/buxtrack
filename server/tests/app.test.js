import app from './../app.js'
import request from 'supertest'

describe('GET /api/hello', () => {
  it('should return a hello message', async () => {
    const res = await request(app).get('/api/v1/hello')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message', 'Hello, world!')
  })
})
