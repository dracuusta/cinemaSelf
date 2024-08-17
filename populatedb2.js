#! /usr/bin/env node

console.log("second script to populate");

const userArgs=process.env.slice(2);

const Actor=require("./models/actor") 
const Director=require("./models/director") 
const Movie=require("./models/movie") 
const Genre=require("./models/genre") 
const MovieDVD=require("./models/moviedvd") 


const actors=[];
const directors=[];
const movies=[];
const genres=[];
const moviedvds=[];

const mongoose=require("mongoose")
mongoose.set("strictQuery",false);

const mongoDB=userArgs[0];
main().catch((err)=>console.log(err));

async function main(){
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected");
  await createActors();
  await createDirectors();
  await createMovies();
  await createGenres();
  await createMovieDVDs();
}

async function actorsCreate(index,first_name,last_name){
  const actor=new Actor({first_name:first_name,last_name:last_name});
  await actor.save();
  actors[index]=actor;
  console.log(`added actor ${actor.name}`);

} 
async function directorsCreate(index,first_name,last_name){
  const actor=new Director({first_name:first_name,last_name:last_name});
  await actor.save();
  actors[index]=actor;
  console.log(`added actor ${actor.name}`);

} 
