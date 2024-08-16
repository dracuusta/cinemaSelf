const asyncHandler=require("express-async-handler")
const {body,validationResult}=require("express-validator")
const Genre=require("../models/genre")


exports.genre_list = asyncHandler(async (req, res, next) => {
  let genres=await Genre.find({}).exec();
   genres=Array.from(new Set(genres.map(genre=>genre.name))) 
                .map(name=>genres.find(a=>a.name===name))
    console.log(genres)
  res.render("genre_list",{
        title:"Genre List",
    genres:genres,
        name:"genre_list"
  })
})
exports.genre_detail=asyncHandler(async(req,res,next)=>{
    res.send("Genre Detail not implemented yet")
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
                console.log("here")
                res.redirect(genreExists.url);
            }
            else{
            console.log("reached valid")
            await genre.save();
            res.redirect(genre.url);
            }

        }


    })
]
exports.genre_update_post=asyncHandler(async(req,res,next)=>{
    res.send("Genre Update Post not implemented yet")
})
exports.genre_update_get=asyncHandler(async(req,res,next)=>{
    res.send("Genre Update Get not implemented yet")
})
exports.genre_delete_get=asyncHandler(async(req,res,next)=>{
    res.send("Genre Delete Get implemented yet")
})
exports.genre_delete_post=asyncHandler(async(req,res,next)=>{
    res.send("Genre Delete Post not implemented yet")
})
