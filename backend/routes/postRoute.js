import express from "express";
import {getAllPosts,createPost,updatePostById,getPostById} from '../controller/postController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
//use can see all posts, create one and update one
router
.route('/')
.post(authenticate,createPost)
.get(authenticate,getAllPosts)

router.route('/:id')
.put(authenticate,updatePostById)
.get(authenticate,getPostById);


export default router;