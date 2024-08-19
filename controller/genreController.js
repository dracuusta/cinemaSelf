const asyncHandler=require("express-async-handler")
const {body,validationResult}=require("express-validator")
const Genre=require("../models/genre")
const Movie=require("../models/movie")


exports.genre_list = asyncHandler(async (req, res, next) => {
  let genres=await Genre.find({}).exec();
   genres=Array.from(new Set(genres.map(genre=>genre.name))) 
                .map(name=>genres.find(a=>a.name===name))
  res.render("genre_list",{
        title:"Genre List",
    genres:genres,
        name:"genre_list"
  })
})
exports.genre_detail=asyncHandler(async(req,res,next)=>{
  const [genre,movie]=await Promise.all([
    Genre.findById(req.params.id).exec(),
    Movie.find({genre:req.params.id}).populate("actor").populate("director").exec(),
  ])
  
  if(genre==null){
    const err=new Error("No genre found with the given information");
    err.status=404;
    next(err);
  }

  res.render("genre_detail",{
    title:genre.name,
    genre:genre,
    movie:movie
  })
})
exports.genre_create_get=asyncHandler(async(req,res,next)=>{
    res.render("genre_form",{title:"Create Genre"})
    
})
exports.genre_create_post=[

    body("name","Genre must contain at list 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),

    asyncHandler(async (req,res,next)=>{

        const errors=validationResult(req);
        const genre=new Genre({name:req.body.name});

        if(!errors.isEmpty()){
            res.render("genre_form",{
                title:"Create Genre",
                genre:genre,
                errors:errors
            })
            return;
        }else{
            /* Data form is valid */
            const genreExists=await Genre.find({name:req.body.name}).collation({locale:"en",strength:2}).exec()
            if(genreExists.length){
                res.redirect(genreExists.url);
            }
            else{
            await genre.save();
            res.redirect(genre.url);
            }

        }


    })
]
exports.genre_update_get=asyncHandler(async(req,res,next)=>{
  const [genre,movie]=await Promise.all([Genre.findById(req.params.id).exec(),
  Movie.find({genre:req.params.id}).populate("actor").populate("director").exec(),
  ]
)

  if(genre===null){
    const error=new Error("Genre with the given id not found");
    error.status=404;
    next(error);
  }

  res.render("genre_form",{
    title:"Update Genre",
    genre:genre,
    movie:movie,
  })
  
})
exports.genre_update_post=[


  body("name","Name must be at least 3 character")
  .trim()
  .isLength({min:3})
  .escape(),

  asyncHandler(async(req,res,next)=>{
    const errors=validationResult(req.params);
    const genre=new Genre({name:req.body.name,_id:req.params.id})

    if(!errors.isEmpty()){
      console.log(errors);
      res.render("genre_form",{
        title:"Create Genre",
        genre:genre,
        errors:errors
      })
      return ;
    }else{
            console.log("here")
        const updatedGenre=await Genre.findByIdAndUpdate(req.params.id,genre,{});
        res.redirect(updatedGenre.url);

    }
  })


]
exports.genre_delete_get=asyncHandler(async(req,res,next)=>{
    const genre=await Genre.findById(req.params.id);
    res.render("genre_delete",{
        title:"Delete Genre",
        genre:genre
    })
})
exports.genre_delete_post=asyncHandler(async(req,res,next)=>{
    await Genre.findByIdAndDelete(req.params.id);
    res.redirect('/catalog/genres')
})
