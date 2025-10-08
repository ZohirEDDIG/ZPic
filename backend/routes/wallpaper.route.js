import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getWallpapers, getWallpaper, uploadWallpaper, getSimilarWallpapers } from '../controllers/wallpaper.controller.js';

const upload = multer();

const router = Router();

router.get('/', getWallpapers);


router.post('/similar', getSimilarWallpapers);

router.get('/:wallpaperId', getWallpaper);


router.post('/upload', upload.single('wallpaper'), authMiddleware, uploadWallpaper);

export default router;