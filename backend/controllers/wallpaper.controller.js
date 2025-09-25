import ImageKit from '../libs/imagekit/imageKit.js';
import User from '../models/User.js';
import Wallpaper from '../models/Wallpaper.js';

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

        if (!user) {
            return res.status(404).json({ error: 'user_not_found' });
        }

        const { name, size, resolution, category, tags } = req.body;
        const errors = { category: { message: '' }, tags: { message: '' }};

        if (!category) {
            errors.category.message = 'please_select_a_category';
        }

        if (tags.length === 0) {
            errors.tags.message = 'please_select_at_least_one_tag';
        } 

        if (errors.category.message || errors.tags.message) {
            return res.status(400).json({ errors });
        }

        const wallpaperFile = req.file;
        const wallpaper = (await ImageKit.upload({ file: wallpaperFile.buffer, fileName: wallpaperFile.originalname, folder: '/zpic' })).url;


        const newWallpaper = new Wallpaper({ wallpaper, name, size, resolution, category, tags,  author: user._id });

        await newWallpaper.save();

        user.uploads.push(newWallpaper._id);
        await user.save();

        return res.status(200).json({ message: 'wallpaper_uploaded_successfully' });

    } catch (error) {
        console.error('Error uploading wallpaper:', error);
        return res.status(500).json({ error: 'error_uploading_wallpaper' });
    }
};

