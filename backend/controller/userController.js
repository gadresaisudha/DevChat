import User from '../model/user.js';
import asyncHandler from '../middleware/asyncHandler.js';
const createUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    

    if (!username || !email || !password) {
        throw new Error("Please fill all the fields");
      }
    
    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send("User already exists");
      const newUser = new User({username,email,password});
    
    try{
        await newUser.save();
        res.status(201).json({id:newUser._id,username:newUser.username,email:newUser.email,password:newUser.password,isAdmin:newUser.isAdmin})
    }
    catch(error){
        console.error(`${error}`);
        res.status(400).send('Invalid User');
    }
    

});

const updateUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    const newUser = new User({username,email,password});
    if (!username || !email || !password) {
        throw new Error("Please fill all the fields");
      }
    
      const userExists = await User.findOne({ email });
      if (userExists) res.status(400).send("User already exists");
    
    try{
        await newUser.save();
        res.status(201).json({id:newUser._id,username:newUser.username,email:newUser.email,password:newUser.password,isAdmin:newUser.isAdmin})
    }
    catch(error){
        console.error(`${error}`);
        res.status(400).send('Invalid User');
    }
    

});
const getUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    const newUser = new User({username,email,password});
    if (!username || !email || !password) {
        throw new Error("Please fill all the fields");
      }
    
      const userExists = await User.findOne({ email });
      if (userExists) res.status(400).send("User already exists");
    
    try{
        await newUser.save();
        res.status(201).json({id:newUser._id,username:newUser.username,email:newUser.email,password:newUser.password,isAdmin:newUser.isAdmin})
    }
    catch(error){
        console.error(`${error}`);
        res.status(400).send('Invalid User');
    }
    

});
const deleteUser = ()=>{
    
}




export {createUser,updateUser,getUser, deleteUser};
