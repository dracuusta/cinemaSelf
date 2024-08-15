const asyncHandler=require("express-async-handler")

exports.moviedvd_list=asyncHandler(async(req,res,next)=>{
    res.send("Movie DVD List not implemented yet")
})
exports.moviedvd_detail=asyncHandler(async(req,res,next)=>{
    res.send("Movie Details not implemented yet")
})
exports.moviedvd_create_get=asyncHandler(async(req,res,next)=>{
    res.send("Movie DVD Create Get not implemented yet")
})
exports.moviedvd_create_post=asyncHandler(async(req,res,next)=>{
    res.send("Movie DVD Post Create not implemented yet")
})
exports.moviedvd_update_post=asyncHandler(async(req,res,next)=>{
    res.send("Movie DVD Update Post not implemented yet")
})
exports.moviedvd_update_get=asyncHandler(async(req,res,next)=>{
    res.send("Movie DVD Update Get not implemented yet")
})
exports.moviedvd_delete_get=asyncHandler(async(req,res,next)=>{
    res.send("Movie DVD Delete Get implemented yet")
})
exports.moviedvd_delete_post=asyncHandler(async(req,res,next)=>{
    res.send("Movie DVD Delete Post not implemented yet")
})