const asyncHandler=require("express-async-handler")


exports.director_list=asyncHandler(async(req,res,next)=>{
    res.send("Director List not implemented yet")
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