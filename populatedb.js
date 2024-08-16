#! /usr/bin/env node

console.log(
  'This script populates some test movies, directors, actors, genres and movie DVDs to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"'
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
  const genre = new Genre({ name: name });
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

async function movieCreate(index, name, date_of_release, synopsis, director, actor, genre) {
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
    genreCreate(3, "Comedy"),
    genreCreate(4, "Thriller"),
    genreCreate(5, "Romance"),
    genreCreate(6, "Horror"),
    genreCreate(7, "Documentary"),
    genreCreate(8, "Fantasy"),
    genreCreate(9, "Adventure"),
    genreCreate(10, "Musical"),
  ]);
}

async function createDirectors() {
  console.log("Adding directors");
  await Promise.all([
    directorCreate(0, "Christopher", "Nolan", "1970-07-30", false),
    directorCreate(1, "Quentin", "Tarantino", "1963-03-27", false),
    directorCreate(2, "Martin", "Scorsese", "1942-11-17", false),
    directorCreate(3, "Steven", "Spielberg", "1946-12-18", false),
    directorCreate(4, "Alfred", "Hitchcock", "1899-08-13", false),
    directorCreate(5, "James", "Cameron", "1954-08-16", false),
    directorCreate(6, "Ridley", "Scott", "1937-11-30", false),
    directorCreate(7, "David", "Fincher", "1962-08-28", false),
    directorCreate(8, "Wes", "Anderson", "1969-05-01", false),
    directorCreate(9, "Greta", "Gerwig", "1983-08-04", false),
  ]);
}

async function createActors() {
  console.log("Adding actors");
  await Promise.all([
    actorCreate(0, "Leonardo", "DiCaprio"),
    actorCreate(1, "Brad", "Pitt"),
    actorCreate(2, "Meryl", "Streep"),
    actorCreate(3, "Emma", "Stone"),
    actorCreate(4, "Tom", "Hanks"),
    actorCreate(5, "Natalie", "Portman"),
    actorCreate(6, "Denzel", "Washington"),
    actorCreate(7, "Joaquin", "Phoenix"),
    actorCreate(8, "Jennifer", "Lawrence"),
    actorCreate(9, "Robert", "Pattinson"),
    actorCreate(10, "Cate", "Blanchett"),
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
      [actors[0]],
      genres[1]
    ),
    movieCreate(
      1,
      "Pulp Fiction",
      "1994-10-14",
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      directors[1],
      [actors[1]],
      genres[0]
    ),
    movieCreate(
      2,
      "The Devil Wears Prada",
      "2006-06-30",
      "A smart but sensible new graduate lands a job as an assistant to Miranda Priestly, the demanding editor-in-chief of a high fashion magazine.",
      directors[2],
      [actors[2]],
      genres[2]
    ),
    movieCreate(
      3,
      "The Matrix",
      "1999-03-31",
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      directors[3],
      [actors[3]],
      genres[1]
    ),
    movieCreate(
      4,
      "Jurassic Park",
      "1993-06-11",
      "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
      directors[4],
      [actors[4]],
      genres[9]
    ),
    movieCreate(
      5,
      "The Godfather",
      "1972-03-24",
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      directors[5],
      [actors[5]],
      genres[0]
    ),
    movieCreate(
      6,
      "The Shawshank Redemption",
      "1994-09-23",
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      directors[6],
      [actors[6]],
      genres[2]
    ),
    movieCreate(
      7,
      "Parasite",
      "2019-05-30",
      "The Kims, a poor family, scheme to become employed by the wealthy Parks, and infiltrate their household by posing as unrelated, highly qualified individuals.",
      directors[7],
      [actors[7]],
      genres[4]
    ),
    movieCreate(
      8,
      "Moonlight",
      "2016-10-21",
      "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of growing up.",
      directors[8],
      [actors[8]],
      genres[2]
    ),
    movieCreate(
      9,
      "Lady Bird",
      "2017-11-03",
      "The adventures of a young woman living in Northern California for a year.",
      directors[9],
      [actors[9]],
      genres[5]
    ),
  ]);
}

async function createMovieDVDs() {
  console.log("Adding Movie DVDs");
  await Promise.all([
    movieDVDCreate(0, movies[0], "Available", false),
    movieDVDCreate(1, movies[1], "Loaned", "2023-09-01"),
    movieDVDCreate(2, movies[2], "Reserved", "2023-08-15"),
    movieDVDCreate(3, movies[3], "Available", false),
    movieDVDCreate(4, movies[4], "Loaned", "2024-01-12"),
    movieDVDCreate(5, movies[5], "Reserved", "2024-02-20"),
    movieDVDCreate(6, movies[6], "Available", false),
    movieDVDCreate(7, movies[7], "Loaned", "2024-04-03"),
    movieDVDCreate(8, movies[8], "Reserved", "2024-05-19"),
    movieDVDCreate(9, movies[9], "Available", false),
  ]);
}
