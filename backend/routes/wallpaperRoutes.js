import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware.js';
import { uploadWallpaper } from '../controllers/wallpaperController.js';

const upload = multer();

const router = Router();

router.post('/upload', upload.single('wallpaper'), authMiddleware, uploadWallpaper);

export default router;