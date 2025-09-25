import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getWallpapers, getWallpaper, uploadWallpaper } from '../controllers/wallpaperController.js';

const upload = multer();

const router = Router();

router.get('/', getWallpapers);
router.get('/:wallpaperId', getWallpaper);
router.post('/upload', upload.single('wallpaper'), authMiddleware, uploadWallpaper);

export default router;