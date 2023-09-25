const app = require('../app')
const request = require('supertest')
require('../models')

let id

test('GET /directors debe traer todos los Directores', async () => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /directors debe crear un Director', async () => {
    const directors = {
        firstName: "Lucas",
        lastName: "Director",
        image: "lucasdirector.com",
        birthday: "2002/09/29"
    }
    const res = await request(app).post('/directors').send(directors)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined()
})

test('PUT /directors/:id debe actualizar un Director', async () => {
    const directorUpdate = {
        lastName: "Director jr"
    }
    const res = await request(app).put(`/directors/${id}`).send(directorUpdate)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(directorUpdate.name);
});

test('DELETE /directors/:id debe eliminar un Director', async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
});