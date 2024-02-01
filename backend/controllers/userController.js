import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { generateRandomPassword } from "../helper/passwordGenerator.js";

//@desc    Auth user/set token
//route    POST /api/users/auth
//@access  Public
const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto:user.profilePhoto
      });
    } else {
      res.status(401);
      //console.log(email,password);
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//@desc    register user
//route    POST /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name,email,password)
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        // _id: user._id,
        // name: user.name,
        // email: user.email,
        message:'success'
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
  //console.log(req.body);
  //res.status(200).json({ message: "Register User" });
});

//@desc    Login with Google
//route    POST /api/users/auth-google
//@access  Public
const authGoogle = asyncHandler(async (req, res) => {
  const { name, email, photo } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      const generatePassword = generateRandomPassword();
      const newUser = await User.create({
        name,
        email,
        password: generatePassword,
        profilePhoto: photo,
      });
      await newUser.save();

      if (newUser) {
        generateToken(res, newUser._id);
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//@desc    Logout user
//route    POST /api/users/logout
//@access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out" });
});

//@desc    Get User Profile
//route    GET /api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user); 
});

//@desc    To Update Profile
//route    PUT /api/users/profile
//@access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc    To Upload user profile image
//route    POST /api/users/upload
//@access  Private
const uploadProfilePhoto = asyncHandler(async(req,res)=>{
  
  try{
    const id = req.query.id;
    const filename = req.file.filename;
    const user = await User.updateOne({_id:id},{$set:{profilePhoto:filename}});
    const userData = await User.findOne({_id:id});
    // const formData = req.body.formData
    // console.log(id);
    // console.log(req.file.filename);
    if(user){
      res.status(200).json(userData);

    }
  }catch(err){
    throw new Error(err);
  }
})

export {
  userAuth,
  registerUser,
  authGoogle,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadProfilePhoto
};
