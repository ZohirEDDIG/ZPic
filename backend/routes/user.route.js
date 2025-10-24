import { Router } from 'express';
import multer from 'multer';

import authMiddleware from '../middlewares/auth.middleware.js';

import { getCurrentUser, editCurrentUser, getCurrentUserUploads, getCurrentUserBookmarks } from '../controllers/user.controller.js';

const upload = multer();

const router = Router();

router.get('/', authMiddleware, getCurrentUser);
router.put('/edit', upload.single('avatar'), authMiddleware, editCurrentUser);
router.get('/uploads', authMiddleware, getCurrentUserUploads);
router.get('/bookmarks', authMiddleware, getCurrentUserBookmarks);

export default router;