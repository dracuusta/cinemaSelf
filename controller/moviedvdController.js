const asyncHandler = require("express-async-handler");
const {body,validationResult}=require("express-validator")
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
    const movies=await Movie.find({}).exec();
    res.render("moviedvd_form",{
        title:"Create Movie DVD",
        movie_list:movies,
    })

});
exports.moviedvd_create_post=[ 
    body("movie","Movie must be specified")
    .trim()
    .isLength({min:1})
    .escape(),
    body("status")
    .escape(),
    body("due_back")
    .isISO8601()
    .escape(),
    asyncHandler(async(req,res,next)=>{
        const errors=validationResult(req);
        const movieDVD=new MovieDVD({
            movie:req.body.movie,
            status:req.body.status,
            due_back:req.body.due_back,
        })

        if(!errors.isEmpty()){

            console.log(errors)
            const movies=await Movie.find({}).exec();
            res.render("moviedvd_form",{
                title:"Create Movie DVD",
                movie_list:movies,
            })
            return ;
        }
        else{
            await movieDVD.save(),
            res.redirect(movieDVD.url);

        }

    })
]
exports.moviedvd_update_get=asyncHandler(async(req,res,next)=>{
    const moviedvd=await MovieDVD.findById(req.params.id).exec();
    const movie_list=await Movie.find({}).exec();
    if(moviedvd===null){
        const error=new Error("MovieDVD could not be found");
        error.status=404;
        next(error);
    }

    res.render("moviedvd_form",{
        title:"Update MovieDVD",
        movie_list:movie_list,
        moviedvd:moviedvd,
    })


})
exports.moviedvd_update_post=[


    body("movie","Movie must be specified")
    .trim()
    .isLength({min:1})
    .escape(),
    body("status")
    .escape(),
    body("due_back")
    .isISO8601()
    .escape(),


  asyncHandler(async(req,res,next)=>{
    const errors=validationResult(req.params);
    const moviedvd=new MovieDVD({movie:req.body.movie,status:req.body.status,due_back:req.body.due_back,_id:req.params.id})
    const movie_list=await Movie.find({}).exec();

    if(!errors.isEmpty()){
      console.log(errors);
      res.render("moviedvd_form",{
        title:"Create MovieDVD",
        moviedvd:moviedvd,
        movie_list:movie_list,
        errors:errors
      })
      return ;
    }else{
        const updatedMovieDVD=await MovieDVD.findByIdAndUpdate(req.params.id,moviedvd,{});
        res.redirect(updatedMovieDVD.url);

    }
  })


]


exports.moviedvd_delete_get=asyncHandler(async(req,res,next)=>{
    const moviedvd=await MovieDVD.findById(req.params.id);
    res.render("moviedvd_delete",{
        title:"Delete MovieDVD",
        moviedvd:moviedvd
    })
})
exports.moviedvd_delete_post=asyncHandler(async(req,res,next)=>{
    await MovieDVD.findByIdAndDelete(req.params.id);
    res.redirect('/catalog/moviedvds')
})
