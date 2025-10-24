import { Router } from 'express';

import { getCategoryTags } from '../controllers/tag.controller.js';

const router = Router();

router.get('/categoryId=:categoryId', getCategoryTags);
router.get('/category/:category', getCategoryTags);

export default router;