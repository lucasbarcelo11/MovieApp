const app = require('../app')
const request = require('supertest')
require('../models')

let id

test('GET /genres debe traer todos los Generos', async () => {
    const res = await request(app).get('/genres')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /genres debe crear un Genero', async () => {
    const genres = {
        name: "Comedia"
    }
    const res = await request(app).post('/genres').send(genres)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined()
})

test('PUT /genres/:id debe actualizar un Genero', async () => {
    const genreUpdate = {
        name: "Comedia2"
    }
    const res = await request(app).put(`/genres/${id}`).send(genreUpdate)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdate.name);
});

test('DELETE /genres/:id debe eliminar un Genero', async () => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204)
});