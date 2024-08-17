const asyncHandler = require("express-async-handler");
const MovieDVD = require("../models/moviedvd");
const Movie = require("../models/movie");

exports.moviedvd_list = asyncHandler(async (req, res, next) => {
  let moviedvds = await MovieDVD.find({}).populate("movie").exec();
  res.render("moviedvd_list", {
    title: "Movie DVD List",
    moviedvds: moviedvds,
        name:"moviedvd_list"
  });
});
exports.moviedvd_detail = asyncHandler(async (req, res, next) => {
  const movieDVDs=await MovieDVD.findById(req.params.id).populate("movie").exec();
  const movie=await Movie.findById(movieDVDs.movie).populate("actor").populate("genre").populate("director").exec();

  if (movieDVDs === null) {
    const err = new Error("No movies found with the given info");
    err.status = 404;
    next(err);
  }

  res.render("moviedvd_detail", {
    title: movieDVDs.movie.name,
    movieDVD: movieDVDs,
    movie:movie,
  })
});
exports.moviedvd_create_get = asyncHandler(async (req, res, next) => {
  movies=await Movie.find({}).exec();
  res.render("moviedvd_form",{
    title:"Create Movie DVD",
    movie_list:movies,
  })

});
exports.moviedvd_create_post = asyncHandler(async (req, res, next) => {
  res.send("Movie DVD Post Create not implemented yet");
});
exports.moviedvd_update_post = asyncHandler(async (req, res, next) => {
  res.send("Movie DVD Update Post not implemented yet");
});
exports.moviedvd_update_get = asyncHandler(async (req, res, next) => {
  res.send("Movie DVD Update Get not implemented yet");
});
exports.moviedvd_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Movie DVD Delete Get implemented yet");
});
exports.moviedvd_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Movie DVD Delete Post not implemented yet");
});

