import express from "express";
import {createUser,updateUser,getUser, deleteUser} from '../controller/userController.js';
const router = express.Router();
router.post('/create',createUser);
router.get('/:id',getUser);
router.put('/update',updateUser);
router.delete('/delete',deleteUser);
export default router;