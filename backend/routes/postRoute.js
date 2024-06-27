import express from "express";
import {getAllPosts,createPost,updatePostById,getPostById} from '../controller/postController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import { getAllComments,updateCommentById,getCommentById,createComment } from "../controller/commentController.js";

const router = express.Router();
//use can see all posts, create one and update one
router
.route('/')
.post(authenticate,createPost)
.get(authenticate,getAllPosts)

//get and update post by id
router.route('/:id')
.put(authenticate,updatePostById)
.get(authenticate,getPostById);

//create and get all comments based on post
router.route('/:postId/comments')
.get(authenticate,getAllComments)
.post(authenticate,createComment);

//get and update comment by ID
router.route('/:postId/comments/:commentId')
.put(authenticate,updateCommentById)
.get(authenticate,getCommentById);


export default router;