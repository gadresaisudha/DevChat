import Post from '../model/post.js';
import User from '../model/user.js';
import Comment from '../model/comment.js';
import asyncHandler from '../middleware/asyncHandler.js';



const createComment = asyncHandler(async(req,res)=>{
    const currentUser = await User.findById(req.user._id);

    const {post,comment,likes,dislikes} = req.body;
    
    //check if all exists are present
    if ( !post || !comment) {
        throw new Error("Please fill all the fields");
      }
    console.log(currentUser._id);
    const newComment = new Comment({user: currentUser,post,comment,likes,dislikes});
    
    //save document to the collection User
    try{
        await newComment.save();
        res.status(201).json({id:newComment._id,username:newComment.user.username,email:newComment.user.email,
                              postid:newComment.post._id,category:newComment.post.category,question:newComment.post.question,
                              comment:newComment.comment,likes:newComment.likes,dislikes:newComment.dislikes});
    }
    catch(error){
        console.error(`${error}`);
        res.status(400).send('Invalid Comment');
    }
    

});


const getAllComments = asyncHandler(async(req,res)=>{
    
    const getAllComments = await Comment.findById(req.params._id);

    if (getAllComments) {
      res.json(getAllComments);
    } else {
      res.status(404);
      throw new Error("Comment not found.");
    }
    

});

const updateComment = asyncHandler(async(req,res)=>{
   
    const currentComment = await Post.findOne({_id : req.params.id});

    if (currentComment) {
        currentComment.question = req.body.comment || currentComment.comment;
        currentComment.likes = req.body.likes || currentComment.likes;
        currentComment.dislikes = req.body.likes || currentComment.dislikes;
  
  
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



export {getAllPosts,createPost,updatePost};