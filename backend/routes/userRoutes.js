import express from "express";
import multer from "multer";
const router = express.Router();
import {
  userAuth,
  registerUser,
  authGoogle,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadProfilePhoto
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import multerStorage from "../helper/multerStorage.js";

router.post("/", registerUser);
router.post("/auth", userAuth);
router.post("/auth-google",authGoogle);
router.post("/logout", logoutUser); 

const upload = multer({ storage: multerStorage });
router.post('/upload',upload.single('image'),uploadProfilePhoto)
router.route("/profile").get( protect,getUserProfile).put(protect,updateUserProfile);

export default router;
