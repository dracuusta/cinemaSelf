const asyncHandler=require("express-async-handler")
const Director=require("../models/director")


exports.director_list=asyncHandler(async(req,res,next)=>{
  let directors=await Director.find({}).sort({first_name:1});
  directors=directors.filter((director,ind,self)=>self.map(x=>x.name).indexOf(director.name)===ind);
  res.render("director_list",{
    title:"Director List",
    directors:directors,
    name:"director_list"
  })
})
exports.director_detail=asyncHandler(async(req,res,next)=>{
    res.send("Director Detail not implemented yet")
})
exports.director_create_get=asyncHandler(async(req,res,next)=>{
    res.send("Director Create Get not implemented yet")
})
exports.director_create_post=asyncHandler(async(req,res,next)=>{
    res.send("Director Post Create not implemented yet")
})
exports.director_update_post=asyncHandler(async(req,res,next)=>{
    res.send("Director Update Post not implemented yet")
})
exports.director_update_get=asyncHandler(async(req,res,next)=>{
    res.send("Director Update Get not implemented yet")
})
exports.director_delete_get=asyncHandler(async(req,res,next)=>{
    res.send("Director Delete Get implemented yet")
})
exports.director_delete_post=asyncHandler(async(req,res,next)=>{
    res.send("Director Delete Post not implemented yet")
})
