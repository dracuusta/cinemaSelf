const asyncHandler=require("express-async-handler");
const Actor=require("../models/actor")
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
    res.send("Actor Detail not implemented yet")
})
exports.actor_create_get=asyncHandler(async(req,res,next)=>{
    res.send("Actor Create Get not implemented yet")
})
exports.actor_create_post=asyncHandler(async(req,res,next)=>{
    res.send("Actor Post Create not implemented yet")
})
exports.actor_update_get=asyncHandler(async(req,res,next)=>{
    res.send("Actor Update Get not implemented yet")
})
exports.actor_update_post=asyncHandler(async(req,res,next)=>{
    res.send("Actor Post Update not implemented yet")
})
exports.actor_delete_get=asyncHandler(async(req,res,next)=>{
    res.send("Actor Delete Get not implemented yet")
})
exports.actor_delete_post=asyncHandler(async(req,res,next)=>{
    res.send("Actor Delete Post not implemented yet")
})
