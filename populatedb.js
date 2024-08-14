#! /usr/bin/env node

console.log(
  'This script populates some test movies, directors, actors, genres and movie DVDs to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Movie = require("./models/movie");
const Director = require("./models/director");
const Actor = require("./models/actor");
const Genre = require("./models/genre");
const MovieDVD = require("./models/moviedvd");

const genres = [];
const directors = [];
const actors = [];
const movies = [];
const moviedvds = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createDirectors();
  await createActors();
  await createMovies();
  await createMovieDVDs();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function genreCreate(index, name) {
  const genre = new Genre({ genre: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function directorCreate(index, first_name, last_name, d_birth, d_death) {
  const directordetail = { first_name: first_name, last_name: last_name };
  if (d_birth != false) directordetail.date_of_birth = d_birth;
  if (d_death != false) directordetail.date_of_death = d_death;

  const director = new Director(directordetail);

  await director.save();
  directors[index] = director;
  console.log(`Added director: ${first_name} ${last_name}`);
}

async function actorCreate(index, first_name, last_name) {
  const actor = new Actor({ first_name: first_name, last_name: last_name });
  await actor.save();
  actors[index] = actor;
  console.log(`Added actor: ${first_name} ${last_name}`);
}

async function movieCreate(
  index,
  name,
  date_of_release,
  synopsis,
  director,
  actor,
  genre,
) {
  const moviedetail = {
    name: name,
    date_of_release: date_of_release,
    synopsis: synopsis,
    director: director,
    actor: actor,
    genre: genre,
  };

  const movie = new Movie(moviedetail);
  await movie.save();
  movies[index] = movie;
  console.log(`Added movie: ${name}`);
}

async function movieDVDCreate(index, movie, status, due_back) {
  const movieDVDdetail = {
    movie: movie,
    status: status,
  };
  if (due_back != false) movieDVDdetail.due_back = due_back;

  const movieDVD = new MovieDVD(movieDVDdetail);
  await movieDVD.save();
  moviedvds[index] = movieDVD;
  console.log(`Added movie DVD: ${movie.name}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Action"),
    genreCreate(1, "Science Fiction"),
    genreCreate(2, "Drama"),
  ]);
}

async function createDirectors() {
  console.log("Adding directors");
  await Promise.all([
    directorCreate(0, "Christopher", "Nolan", "1970-07-30", false),
    directorCreate(1, "Quentin", "Tarantino", "1963-03-27", false),
    directorCreate(2, "Martin", "Scorsese", "1942-11-17", false),
  ]);
}

async function createActors() {
  console.log("Adding actors");
  await Promise.all([
    actorCreate(0, "Leonardo", "DiCaprio"),
    actorCreate(1, "Brad", "Pitt"),
    actorCreate(2, "Meryl", "Streep"),
  ]);
}

async function createMovies() {
  console.log("Adding Movies");
  await Promise.all([
    movieCreate(
      0,
      "Inception",
      "2010-07-16",
      "A thief who enters the dreams of others to steal secrets from their subconscious.",
      directors[0],
      [actors[0], actors[1]],
      genres[1],
    ),
    movieCreate(
      1,
      "Pulp Fiction",
      "1994-10-14",
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      directors[1],
      [actors[1]],
      genres[0],
    ),
    movieCreate(
      2,
      "The Devil Wears Prada",
      "2006-06-30",
      "A smart but sensible new graduate lands a job as an assistant to Miranda Priestly, the demanding editor-in-chief of a high fashion magazine.",
      directors[2],
      [actors[2]],
      genres[2],
    ),
  ]);
}

async function createMovieDVDs() {
  console.log("Adding Movie DVDs");
  await Promise.all([
    movieDVDCreate(0, movies[0], "Available", false),
    movieDVDCreate(1, movies[1], "Loaned", "2023-09-01"),
    movieDVDCreate(2, movies[2], "Reserved", "2023-08-15"),
  ]);
}
