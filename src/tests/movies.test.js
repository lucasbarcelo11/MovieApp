const app = require('../app')
const request = require('supertest')
const Genres = require('../models/Genres')
const Actors = require('../models/Actors')
const Directors = require('../models/Directors')
require('../models')

let id

test('GET /movies debe traer todas las Peliculas', async () => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /movies debe crear una Pelicula', async () => {
    const movies = {
        name: "Chernobyl",
        image: "chernobyl.img",
        synopsis: "Pelicula sobre una explocion nuclear",
        releaseYear: 2010
    }
    const res = await request(app).post('/movies').send(movies)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined()
})

test('PUT /movies/:id debe actualizar una Pelicula', async () => {
    const moviesUpdate = {
        releaseYear: 2011
    }
    const res = await request(app).put(`/movies/${id}`).send(moviesUpdate)
    expect(res.status).toBe(200);
    expect(res.body.releaseYear).toBe(moviesUpdate.releaseYear);
});

test('POST /movies/:id/genres debe insertar los generos de una pelicula ', async () => {
    const genre = await Genres.create({name: "Terror"})
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id])
    await genre.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/actors debe insertar los actores de una pelicula ', async () => {
    const actor = await Actors.create({firstName: "Leo", lastName: "Da vinchi", image: "leodavinchi.png", birthday: "1998/09/19"})
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors debe insertar los Directores de una pelicula ', async () => {
    const directors = await Directors.create({firstName: "Paolo", lastName: "Montero", image: "paolomontero.png", birthday: "2000/09/19"})
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([directors.id])
    await directors.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id debe eliminar una Pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
});