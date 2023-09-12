
const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");


Actors.belongsToMany(Movies, {through: "ActorsMovie"})
Movies.belongsToMany(Actors, {through: "ActorsMovie"})

Directors.belongsToMany(Movies, {through: "DirectorsMovies"})
Movies.belongsToMany(Directors, {through: "DirectorsMovies"})


Movies.hasMany(Genres)