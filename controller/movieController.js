const Movie = require("../models/movie");
const { body, validationResult } = require("express-validator")
const Actor = require("../models/actor");
const Genre = require("../models/genre");
const MovieDVD = require("../models/moviedvd");
const Director = require("../models/director")
const asyncHandler = require("express-async-handler");


exports.movie_list = asyncHandler(async (req, res, next) => {
  let movies = await Movie.find({}).populate("director").populate("actor").populate("genre").sort({ name: 1 }).exec();
  movies = Array.from(new Set(movies.map(movie => movie.name)))
    .map(name => movies.find(a => a.name === name))
  res.render("movie_list", {
    title: "Movie List",
    movies: movies,
    name: "movie_list"
  })


});
exports.movie_detail = asyncHandler(async (req, res, next) => {
  let movie = await Movie.findById(req.params.id).populate("actor").populate("genre").populate("director").exec();
  const movieDVDs = await MovieDVD.findOne({ movie: req.params.id }).exec();

  console.log(movie.actor)

  if (movie === null) {
    const err = new Error("No movies found with the given info");
    err.status = 404;
    next(err);
  }

  res.render("movie_detail", {
    title: movie.name,
    movie: movie,
    movieDVD: movieDVDs,
  })
});
exports.index = asyncHandler(async (req, res, next) => {
  const [
    numMovies,
    numActors,
    numDirectors,
    numGenres,
    numMovieDVDs,
    numAvailableMovieDVDs,
  ] = await Promise.all([
    Movie.countDocuments({}).exec(),
    Actor.countDocuments({}).exec(),
    Director.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
    MovieDVD.countDocuments({}).exec(),
    MovieDVD.countDocuments({ status: "Available" }).exec(),
  ]);
  res.render("index", {
    title: "CinemaSelf Home",
    movie_count: numMovies,
    actor_count: numActors,
    director_count: numDirectors,
    genre_count: numGenres,
    moviedvd_count: numMovieDVDs,
    available_moviedvd_count: numAvailableMovieDVDs,
    name: "index",
  });
});
exports.movie_create_get = asyncHandler(async (req, res, next) => {
  let [allActors, allDirectors, allGenres] = await Promise.all([
    Actor.find().exec(),
    Director.find().sort({ first_name: 1 }).exec(),
    Genre.find({}).sort({ name: 1 }).exec(),
  ]);
  allGenres = allGenres
    .filter(genre => genre.name !== undefined)
    .filter((value, index, self) => self.map(x => x.name).indexOf(value.name) == index);

  allActors = allActors.filter((value, index, self) => self.map(x => x.name).indexOf(value.name) === index)

  allDirectors = Array.from(new Set(allDirectors.map(d => d.name)))
    .map(name => allDirectors.find(d => d.name === name))
  res.render("movie_form", {
    title: "Create Movie",
    actors: allActors,
    directors: allDirectors,
    genres: allGenres,
  })
});
exports.movie_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.actor)) {
      req.body.actor = typeof req.body.actor === undefined ? [] : [req.body.actor]
    }
    next();
  },
  body("name", "Name must have min 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("synopsis", "Synopsis must be at least 10 characters")
    .trim()
    .isLength({ min: 10 })
    .escape(),

  body("genre.*").escape(),


  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const movie = new Movie({
      name: req.body.name,
      date_of_release: req.body.date_of_release,
      synopsis: req.body.synopsis,
      actor: req.body.actor,
      director: req.body.director,
      genre: req.body.genre,
    })


    if (!errors.isEmpty()) {
      const [allActors, allDirectors, allGenres] = await Promise.all([
        Actor.find({}).sort({ first_name: 1 }).exec(),
        Director.find({}).sort({ first_name: 1 }).exec(),
        Genre.find({}).sort({ name: 1 }).exec()
      ]);

      for (const actor of allActors) {
        if (movie.actor.includes(actor._id)) {
          actor.checked = "true"

        }
      }

      res.render("movie_form", {
        actors: allActors,
        directors: allDirectors,
        genres: allGenres,
        erros: errors,
      });



    } else {
      await movie.save()
      res.redirect(movie.url)
    }

  })

]

exports.movie_update_post = asyncHandler(async (req, res, next) => {
  res.send("movie_update_post not implemented yet");
})
exports.movie_update_get = asyncHandler(async (req, res, next) => {
  let [movie,allActors, allDirectors, allGenres] = await Promise.all([
    Movie.findById(req.params.id).exec(),
    Actor.find().exec(),
    Director.find().sort({ first_name: 1 }).exec(),
    Genre.find({}).sort({ name: 1 }).exec(),
  ]);
  allGenres = allGenres
    .filter(genre => genre.name !== undefined)
    .filter((value, index, self) => self.map(x => x.name).indexOf(value.name) == index);

  allActors = allActors.filter((value, index, self) => self.map(x => x.name).indexOf(value.name) === index)

  console.log(movie);
  allDirectors = Array.from(new Set(allDirectors.map(d => d.name)))
    .map(name => allDirectors.find(d => d.name === name))
  res.render("movie_form", {
    title: "Create Movie",
    movie:movie,
    actors: allActors,
    directors: allDirectors,
    genres: allGenres,
  })
});
exports.movie_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Movie Delete Get implemented yet");
});
exports.movie_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Movie Delete Post not implemented yet");
});
