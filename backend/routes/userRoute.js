import express from "express";
import {createUser,updateUserProfile,getUserProfile, loginUser, logoutUser} from '../controller/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
//intial user creation,login and logout
router.post('/register',createUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

//user can update his profile and also see the profile details
router
.route("/profile")
.get(authenticate, getUserProfile)
.put(authenticate, updateUserProfile);



export default router;