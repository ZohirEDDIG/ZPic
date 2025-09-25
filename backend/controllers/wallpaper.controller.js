import ImageKit from '../libs/imagekit/imageKit.js';
import User from '../models/user.model.js';
import Wallpaper from '../models/wallpaper.model.js';

export const getWallpapers = async (req, res) => {
    try {
        const wallpapers = await Wallpaper.find();

        return res.status(200).json({ wallpapers });
    } catch (error) {
        console.error('Error fetching wallpapers:', error);
        return res.status(500).json({ error: 'error_fetching_wallpapers' });
    }
};

export const getWallpaper = async (req, res) => {
    try {
        const { wallpaperId } = req.params;

        const wallpaper = await Wallpaper.findById(wallpaperId).select('wallpaper name size resolution category tags author createdAt').populate('author', 'username');
        
        return res.status(200).json({ wallpaper });
    } catch (error) {
        console.error('Error fetching wallpaper:', error);
        return res.status(500).json({ error: 'error_fetching_wallpaper' });
    }
};

export const uploadWallpaper = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ error: 'user_not_found' });

        const { name, size, resolution, category, tags } = req.body;
        const wallpaperFile = req.file;

        const errors = await validateWallpaperData({ wallpaper: wallpaperFile, name, resolution, category, tags });
        if (errors) return res.status(400).json({ errors });

        const wallpaper = (await ImageKit.upload({file: wallpaperFile.buffer, fileName: wallpaperFile.originalname, folder: '/zpic' })).url;

        const newWallpaper = new Wallpaper({ wallpaper, name, size, resolution, category, tags, author: user._id });

        await newWallpaper.save();

        user.uploads.push(newWallpaper._id);
        await user.save();

        return res.status(200).json({ message: 'wallpaper_uploaded_successfully' });
    } catch (error) {
        console.error('Error uploading wallpaper:', error);
        return res.status(500).json({ error: 'error_uploading_wallpaper' });
    }
};
