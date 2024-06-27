import Post from '../model/post.js';
import User from '../model/user.js';
import Comment from '../model/comment.js';
import asyncHandler from '../middleware/asyncHandler.js';



const createComment = asyncHandler(async(req,res)=>{
    const currentUser = await User.findById(req.user._id);
    const {comment,likes,dislikes} = req.body;
    const post = req.params.postId;
    //check if all exists are present
    if ( !post || !comment) {
        throw new Error("Please fill all the fields");
      }
    console.log(currentUser._id);
    const newComment = new Comment({user: currentUser,post: post,comment,likes,dislikes});
    
    //save document to the collection User
    try{
        await newComment.save();
        res.status(201).json(newComment);
    }
    catch(error){
        console.error(`${error}`);
        res.status(400).send('Invalid Comment');
    }
    

});


const getAllComments = asyncHandler(async(req,res)=>{
    
    const getAllComments = await Comment.find({post: req.params.postId});

    if (getAllComments) {
      res.json(getAllComments);
    } else {
      res.status(404);
      throw new Error("Comment not found.");
    }
    

});
const getCommentById = asyncHandler(async(req,res)=>{
   
  const currentComment = await Comment.findOne({_id : req.params.commentId, post: req.params.postId});

  if (currentComment) {

    res.json({
      _id: currentComment._id,
      comment:currentComment.comment,
      likes:currentComment.likes,
      dislikes:currentComment.dislikes
    });
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

const updateCommentById = asyncHandler(async(req,res)=>{
   
    const currentComment = await Comment.findOne({_id : req.params.commentId,post: req.params.postId });

    if (currentComment) {
        currentComment.comment = req.body.comment || currentComment.comment;
        currentComment.likes = req.body.likes || currentComment.likes;
        currentComment.dislikes = req.body.dislikes || currentComment.dislikes;
  
  
      const updatedComment = await currentComment.save();
  
      res.json({
        _id: updatedComment._id,
        comment:updatedComment.comment,
        likes:updatedComment.likes,
        dislikes:updatedComment.dislikes
      });
    } else {
      res.status(404);
      throw new Error("Comment not found");
    }
});



export {createComment,getAllComments,updateCommentById,getCommentById};