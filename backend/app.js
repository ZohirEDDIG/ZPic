import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import wallpaperRoutes from './routes/wallpaper.route.js';
import categoryRoutes from './routes/category.route.js';
import tagRoutes from './routes/tag.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallpapers', wallpaperRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);

export default app;