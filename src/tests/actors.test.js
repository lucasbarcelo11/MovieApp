const app = require('../app')
const request = require('supertest')
require('../models')

let id

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /actors debe crear un Actor', async () => {
    const actor = {
        firstName: "Maluma",
        lastName: "Baby",
        image: "maluma.com",
        birthday: "1998/08/29"
    }
    const res = await request(app).post('/actors').send(actor)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined()
})

test('PUT /actors/:id debe actualizar un Actor', async () => {
    const actorUpdate = {
        lastName: "Babybaby"
    }
    const res = await request(app).put(`/actors/${id}`).send(actorUpdate)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actorUpdate.name);
});

test('DELETE /actors/:id debe eliminar un Actor', async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
});