const asyncHandler=require("express-async-handler")


exports.genre_list=asyncHandler(async(req,res,next)=>{
    res.send("Genre List not implemented yet")
})
exports.genre_detail=asyncHandler(async(req,res,next)=>{
    res.send("Genre Detail not implemented yet")
})
exports.genre_create_get=asyncHandler(async(req,res,next)=>{
    res.send("Genre Create Get not implemented yet")
})
exports.genre_create_post=asyncHandler(async(req,res,next)=>{
    res.send("Genre Post Create not implemented yet")
})
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