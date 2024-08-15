const Movie = require("../models/movie");
const Actor = require("../models/actor");
const Genre = require("../models/genre");
const MovieDVD = require("../models/moviedvd");
const Director=require("../models/director")
const asyncHandler = require("express-async-handler");


exports.movie_list = asyncHandler(async (req, res, next) => {
  res.send("Movie list no implemented fsdyet");
});
exports.movie_detail = asyncHandler(async (req, res, next) => {
  res.send("Movie detail not implemented yet");
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
  });
});
exports.movie_create_get = asyncHandler(async (req, res, next) => {
 let [allActors,allDirectors,allGenres] = await Promise.all([
    Actor.find().exec(),
    Director.find().sort({first_name:1}).exec(),
    Genre.find({}).sort({name:1}).exec(),
  ]);
  console.log(allActors);  
  allActorsUnique=allActors.filter((actor,index)=>allActors.indexOf(actor)===index);
  res.render("movie_form",{
    title: "Create Movie",
    actors:allActorsUnique,
    directors:allDirectors,
    genres:allGenres,
  })
});
exports.movie_create_post = asyncHandler(async (req, res, next) => {
  res.send("Movie Post Create not implemented yet");
});
exports.movie_update_post = asyncHandler(async (req, res, next) => {
  res.send("Movie Update Post not implemented yet");
});
exports.movie_update_get = asyncHandler(async (req, res, next) => {
  res.send("Movie Update Get not implemented yet");
});
exports.movie_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Movie Delete Get implemented yet");
});
exports.movie_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Movie Delete Post not implemented yet");
});
