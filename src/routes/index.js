const express = require('express');
const actorsRouter = require('./actors.router');
const directorsRouter = require('./directors.router');
const moviesRouter = require('./movies.router');
const genresRouter = require('./genres.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/actors', actorsRouter)
router.use('/directors', directorsRouter)
router.use('/movies', moviesRouter)
router.use('/genres', genresRouter)

module.exports = router;