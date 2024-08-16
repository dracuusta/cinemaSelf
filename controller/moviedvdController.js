const asyncHandler = require("express-async-handler");
const MovieDVD = require("../models/moviedvd");

exports.moviedvd_list = asyncHandler(async (req, res, next) => {
  let moviedvds = await MovieDVD.find({}).exec();
    console.log(moviedvds)
  res.render("moviedvd_list", {
    title: "Movie DVD List",
    moviedvds: moviedvds,
        name:"moviedvd_list"
  });
});
exports.moviedvd_detail = asyncHandler(async (req, res, next) => {
  res.send("Movie Details not implemented yet");
});
exports.moviedvd_create_get = asyncHandler(async (req, res, next) => {
  res.send("Movie DVD Create Get not implemented yet");
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

