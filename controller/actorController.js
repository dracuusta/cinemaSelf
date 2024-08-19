const asyncHandler=require("express-async-handler");
const {body,validationResult}=require("express-validator")
const Actor=require("../models/actor")
const Movie=require("../models/movie")
exports.actor_list=asyncHandler(async(req,res,next)=>{
  let actors=await Actor.find({}).sort({first_name:1});
  actors=actors.filter((actor,ind,self)=>self.map(x=>x.name).indexOf(actor.name)===ind);
  res.render("actor_list",{
    title:"Actor List",
    actors:actors,
    name:"actor_list"
  })
})
exports.actor_detail=asyncHandler(async(req,res,next)=>{
  const actor=await Actor.findById(req.params.id).exec();
  const movies=await Movie.find({actor:req.params.id}).exec();
  console.log(movies)
  if(actor==null){
    const err=new Error("Actor details not available");
    err.status=404;
    next(err);
  }

  res.render("actor_detail",{
    title:actor.name,
    actor:actor,
    movie:movies,
  })
})
exports.actor_create_get=asyncHandler(async(req,res,next)=>{

  res.render("actor_form",{
    title:"Create Actor",
  })
})
exports.actor_create_post=[

    body("first_name","Genre must contain at list 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
    body("last_name","Genre must contain at list 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),

    asyncHandler(async (req,res,next)=>{

        const errors=validationResult(req);
        const actor=new Actor({first_name:req.body.first_name,last_name:req.body.last_name});

        if(!errors.isEmpty()){
            res.render("actor_form",{
                title:"Create Actor",
                actor:actor,
                errors:errors
            })
            return;
        }else{
            /* Data form is valid */
            const actorExists=await Actor.find({first_name:req.body.first_name,last_name:req.body.last_name}).collation({locale:"en",strength:2}).exec()
            if(actorExists.length){
                res.redirect(actorExists.url);
            }
            else{
            await actor.save();
            res.redirect(actor.url);
            }

        }


    })
]
exports.actor_update_get=asyncHandler(async(req,res,next)=>{
    const actor=await Actor.findById(req.params.id).exec();
    if(actor===null){
        const error=new Error("Actor could not be found");
        error.status=404;
        next(error);
    }

    res.render("actor_form",{
        title:"Update Actor",
        actor:actor,
    })


})
exports.actor_update_post=[


  body("first_name","First Name must be at least 3 character")
  .trim()
  .isLength({min:3})
  .escape(),
  body("last_name","Field Name must be at least 3 characters")
  .trim()
  .isLength({min:3})
  .escape(),

  asyncHandler(async(req,res,next)=>{
    const errors=validationResult(req.params);
    const actor=new Actor({first_name:req.body.first_name,last_name:req.body.last_name,_id:req.params.id})

    if(!errors.isEmpty()){
      console.log(errors);
      res.render("actor_form",{
        title:"Create Actor",
        actor:actor,
        errors:errors
      })
      return ;
    }else{
        const updatedActor=await Actor.findByIdAndUpdate(req.params.id,actor,{});
        res.redirect(updatedActor.url);

    }
  })


]


exports.actor_delete_get=asyncHandler(async(req,res,next)=>{
    const actor=await Actor.findById(req.params.id);
    res.render("actor_delete",{
        title:"Delete Actor",
        actor:actor
    })
})
exports.actor_delete_post=asyncHandler(async(req,res,next)=>{
    await Actor.findByIdAndDelete(req.params.id);
    res.redirect('/catalog/actors')
})
