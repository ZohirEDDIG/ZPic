import express from 'express';
import cors from 'cors';
import { authRoutes, userRoutes, wallpaperRoutes } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallpaper', wallpaperRoutes);

export default app;