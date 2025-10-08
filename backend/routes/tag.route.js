import { Router } from 'express';
import { getCategoryTags, addTag } from '../controllers/tag.controller.js';

const router = Router();

router.get('/categoryId=:categoryId', getCategoryTags);
router.post('/add-tag', addTag);

export default router;