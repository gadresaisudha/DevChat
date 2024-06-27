import Post from '../model/post.js';
import User from '../model/user.js';
import asyncHandler from '../middleware/asyncHandler.js';



const createPost = asyncHandler(async(req,res)=>{
    const currentUser = await User.findById(req.user._id);
    const {question,category} = req.body;
    
    //check if all exists are present
    if ( !question || !category) {
        throw new Error("Please fill all the fields");
      }
    console.log(currentUser._id);
    const newPost = new Post({user: currentUser ,question,category});
    
    //save document to the collection User
    try{
        await newPost.save();
        res.status(201).json({id:newPost._id,username:newPost.user.username,email:newPost.user.email,question:newPost.question,category:newPost.category})
    }
    catch(error){
        console.error(`${error}`);
        res.status(400).send('Invalid Post');
    }
    

});


const getAllPosts = asyncHandler(async(req,res)=>{
    
    const getAllPosts = await Post.find({});

    if (getAllPosts) {
      res.json(getAllPosts);
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
    

});

const getPostById = asyncHandler(async(req,res)=>{
   
  const currentPost = await Post.findOne({_id : req.params.id});

  if (currentPost) {

    res.json({
      _id: currentPost._id,
      username: currentPost.user.username,
      email: currentPost.user.email,
      question: currentPost.question,
      category:currentPost.category
    });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

const updatePostById = asyncHandler(async(req,res)=>{
   
    const currentPost = await Post.findOne({_id : req.params.id});

    if (currentPost) {
        currentPost.question = req.body.question || currentPost.question;
        currentPost.category = req.body.category || currentPost.category;
  
  
      const updatedPost = await currentPost.save();
  
      res.json({
        _id: updatedPost._id,
        username: updatedPost.user.username,
        email: updatedPost.user.email,
        question: updatedPost.question,
        category:updatedPost.category
      });
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
});



export {getAllPosts,createPost,updatePostById,getPostById};
