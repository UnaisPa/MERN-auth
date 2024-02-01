import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'frontend/public/images'); // Specify the directory to save the images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

export default storage;