import User from '../model/user.js';
import asyncHandler from '../middleware/asyncHandler.js';
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    
    //check if all exists are present
    if (!username || !email || !password) {
        throw new Error("Please fill all the fields");
      }
    
      //check if user already  exists
    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send("User already exists");

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username,email,password :hashedPassword});
    
    //save document to the collection User
    try{
        await newUser.save();
        res.status(201).json({id:newUser._id,username:newUser.username,email:newUser.email,password:newUser.password,isAdmin:newUser.isAdmin})
    }
    catch(error){
        console.error(`${error}`);
        res.status(400).send('Invalid User');
    }
    

});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    
    //check if all exists are present
    if (!email || !password) {
        throw new Error("Please fill all the fields");
      }
    
      //check if user already  exists
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists){

      const isPasswordValid =  await bcrypt.compare(password,userExists.password);
      console.log(isPasswordValid);
          if (isPasswordValid) {
            createToken(res, userExists._id);
      
            res.status(201).json({
              _id: userExists._id,
              username: userExists.username,
              email: userExists.email,
              isAdmin: userExists.isAdmin,
            });
            return;
          }
    }

});

const logoutUser = asyncHandler(async(req, res) => {
    res.cookie("jwt", "", {
      httyOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});


const getUserProfile = asyncHandler(async(req,res)=>{
    
    const currentUser = await User.findById(req.user._id);

    if (currentUser) {
      res.json({
        _id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
    

});

const updateUserProfile = asyncHandler(async(req,res)=>{
   
    const currentUser = await User.findById(req.user._id);

    if (currentUser) {
        currentUser.username = req.body.username || currentUser.username;
        currentUser.email = req.body.email || currentUser.email;
  
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        currentUser.password = hashedPassword;
      }
  
      const updatedUser = await currentUser.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
});



export {createUser,updateUserProfile,getUserProfile, loginUser,logoutUser};
