const request = require('supertest')
const app = require('../src/app')

test('should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Yayatika',
        email: 'yayatika@example.com',
        password: 'Yayatika@0708',
        age: 25
    }).expect(201)
})
