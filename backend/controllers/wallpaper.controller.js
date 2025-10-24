import mongoose from 'mongoose';

import Wallpaper from '../models/wallpaper.model.js';
import User from '../models/user.model.js';

import imageKit from '../libs/imagekit/imageKit.js';

import { validateWallpaperData } from '../utils/validators/wallpaper.validator.js';

export const getWallpapers = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const skip = (currentPage - 1) * limit;

        const wallpapers = await Wallpaper.find().skip(skip).limit(limit);

        const totalWallpaper = await Wallpaper.countDocuments();

        return res.status(200).json({ wallpapers, totalPages: Math.ceil(totalWallpaper / limit)});
    } catch (error) {
        console.error('Error fetching wallpapers:', error);
        return res.status(500).json({ error: 'Error fetching wallpapers' });
    }
};

export const getWallpaper = async (req, res) => {
    try {
        const { wallpaperId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(wallpaperId)) {
            return res.status(400).json({ error: 'Invalid wallpaper id' });
        }
        
        const wallpaper = await Wallpaper.findById(wallpaperId).select('wallpaper name size resolution category tags author createdAt')
        .populate('author', 'username')
        .populate('category', 'name')
        .populate('tags', 'name');

        if (!wallpaper) return res.status(404).json({ error: 'Wallpaper not found' });
        
        return res.status(200).json({ wallpaper });
    } catch (error) {
        console.error('Error fetching wallpaper:', error.message);
        return res.status(500).json({ error: 'Error fetching wallpaper' });
    }
};

export const uploadWallpaper = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const { name, size, resolution, category, tags } = req.body;
        const wallpaperFile = req.file;

        const errors = await validateWallpaperData({ wallpaper: wallpaperFile, name, resolution, category, tags });
        if (errors) return res.status(400).json({ errors });

        const wallpaper = (await imageKit.upload({file: wallpaperFile.buffer, fileName: wallpaperFile.originalname, folder: '/zpic' })).url;

        const newWallpaper = new Wallpaper({ wallpaper, name, size, resolution, category, tags, author: user._id });

        await newWallpaper.save();

        user.uploads.push(newWallpaper._id);
        await user.save();

        return res.status(200).json({ message: 'Wallpaper uploaded successfully' });
    } catch (error) {
        console.error('Error uploading wallpaper:', error);
        return res.status(500).json({ error: 'Error uploading wallpaper' });
    }
};

export const getSimilarWallpapers = async (req, res) => {
    try {
        const { tags } = req.body;

        const similarWallpapers = await Wallpaper.find({ tags: { $in: tags }});

        return res.status(200).json({ similarWallpapers });
    } catch (error) {
        console.error('Error fetching similar wallpapers:', error.message);
        return res.status(500).json({ error: 'Error fetching similar wallpapers' });
    }
};

export const likeWallpaper = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const { wallpaperId } = req.params;
        const wallpaper = await Wallpaper.findById(wallpaperId);
        if (!wallpaper) return res.status(404).json({ error: 'User not found' });

        let action

        if (user.likes.includes(wallpaperId)) {
            action = 'unlike';
            user.likes = user.likes.filter((bookmarkedWallpaperId) => bookmarkedWallpaperId !== wallpaperId);
            await user.save();

            wallpaper.likes -= 1;
            await wallpaper.save();
        } else {
            action = 'like';
            user.likes.push(wallpaperId);
            await user.save()

            wallpaper.likes += 1;
            await wallpaper.save();
        }

        return res.status(200).json({ message: `Wallpaper ${action === 'like' ? 'liked' : 'unliked'} successfully` });
    } catch (error) {
        console.error(`Error  ${action === 'like' ? 'liked' : 'unliked'} wallpaper:`, error.message);
        return res.status(500).json({ error: `'Error ${action === 'like' ? 'liking' : 'unliking'} wallpaper'`});
    }
}

export const bookmarkWallpaper = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const { wallpaperId } = req.params;
        const wallpaper = await Wallpaper.findById(wallpaperId);
        if (!wallpaper) return res.status(404).json({ error: 'User not found' });

        let action; 

        if (user.bookmarks.includes(wallpaperId)) {
            action = 'unbookmark';
            user.bookmarks = user.bookmarks.filter((bookmarkedWallpaperId) => bookmarkedWallpaperId !== wallpaperId);
            await user.save();

            wallpaper.bookmarks -= 1;
            await wallpaper.save();
        } else {
            action = 'bookmark';
            user.bookmarks.push(wallpaperId);
            await user.save()

            wallpaper.bookmarks += 1;
            await wallpaper.save();
        }

        return res.status(200).json({ message: `Wallpaper ${action === 'bookmark' ? 'Bookmarked' : 'Unbookmarked'} successfully`});
    } catch (error) {
        console.error(`Error ${action === 'bookmark' ? 'bookmarking' : 'unbookmarking'} wallpaper:`, error.message);
        return res.status(500).json({ error: `Error ${action === 'bookmark' ? 'bookmarking' : 'unbookmarking'} wallpaper`});
    }
}