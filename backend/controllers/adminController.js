import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

//@desc    Auth Admin/set token
//route    POST /api/admin/auth
//@access  Public

const adminAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await User.findOne({ email: email });
    if (check && (await check.matchPassword(password))) {
      if (check.isAdmin) {
        generateToken(res, check);
        res.status(200).json(check);
      } else {
        throw new Error("Access Denied: Unauthorized User!");
      }
    } else {
      throw new Error("Access Denied! Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//@desc    Get user datas
//route    GET /api/admin/users_data
//@access  Private

const getUserData = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  try {
    const users = await User.find({
      $or: [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ],
      isAdmin: false,
    });
    if (users) {
      res.status(200).json(users);
    } else {
      throw new Error("Error on getting user datas");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//@desc    Get single user data by Id
//route    GET /api/admin/user/:id
//@access  Private

const getUserDataById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    //console.log(id);
    const user = await User.findOne({ _id: id });
    if (user) {
      res.status(200).json(user);
    } else {
      throw new Error("User Not found!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//@desc    Delete user data by Id
//route    DELETE /api/admin/delete_user/:id
//@access  Private

const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.deleteOne({ _id: id });
    if (deleteUser) {
      res.status(200).json({ message: "User account deleted successfully" });
    } else {
      throw new Error("Cannot delete user account!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//@desc    Update user data by Id
//route    PUT /api/admin/edit_user/:id
//@access  Private

const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    if (updatedUser) {
      res.status(200).json(user);
    } else {
      throw new Error("Cannot Update this account");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//@desc    Add an User
//route    POST /api/admin/add_user
//@access  Private

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let filename = req.file.filename
  filename==null?filename='':filename;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      profilePhoto: filename,
    });
    await newUser.save();
    res.json('successfully added');
  } catch (err) {
    res.json(err.message);
    console.log(err);
  }
});

export {
  adminAuth,
  getUserData,
  getUserDataById,
  deleteUserById,
  updateUserById,
  addUser,
};
