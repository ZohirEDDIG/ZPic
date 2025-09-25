import { Router } from 'express';
import { getCategoryTags } from '../controllers/tagController.js';

const router = Router();

router.get('/categoryId=:categoryId', getCategoryTags);

export default router;