
const asyncHandler=require("express-async-handler")


exports.movie_list=asyncHandler(async(req,res,next)=>{
    res.send("Movie list no implemented fsdyet")
})
exports.movie_detail=asyncHandler(async(req,res,next)=>{
    res.send("Movie detail not implemented yet")
})
exports.index=asyncHandler(async(req,res,next)=>{
    res.render("layout",{
        title:"Movie list"
    })
})
exports.movie_create_get=asyncHandler(async(req,res,next)=>{
    res.send("Movie Create Get not implemented yet")
})
exports.movie_create_post=asyncHandler(async(req,res,next)=>{
    res.send("Movie Post Create not implemented yet")
})
exports.movie_update_post=asyncHandler(async(req,res,next)=>{
    res.send("Movie Update Post not implemented yet")
})
exports.movie_update_get=asyncHandler(async(req,res,next)=>{
    res.send("Movie Update Get not implemented yet")
})
exports.movie_delete_get=asyncHandler(async(req,res,next)=>{
    res.send("Movie Delete Get implemented yet")
})
exports.movie_delete_post=asyncHandler(async(req,res,next)=>{
    res.send("Movie Delete Post not implemented yet")
})