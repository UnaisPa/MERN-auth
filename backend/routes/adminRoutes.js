import express from "express";
const router = express.Router()
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

import {
    adminAuth,
    getUserData,
    getUserDataById,
    deleteUserById,
    updateUserById,
    addUser
} from "../controllers/adminController.js"
import multerStorage from "../helper/multerStorage.js";


router.post('/auth',adminAuth);
router.get('/users_data',protect,getUserData);
router.get('/user/:id',protect,getUserDataById);
router.delete('/delete_user/:id',protect,deleteUserById);
router.put('/edit_user/:id',protect,updateUserById);
const upload = multer({ storage: multerStorage });

//router.post('/upload',upload.single('image'),uploadProfilePhoto)
router.post('/add_user',protect,upload.single('image'),addUser);
export default router;