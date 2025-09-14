import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getCurrentUser,editCurrentUser } from '../controllers/userController.js';

const upload = multer();

const router = Router();

router.get('/', authMiddleware, getCurrentUser);
router.put('/edit', upload.single('avatar'), authMiddleware, editCurrentUser);

export default router;