import ImageKit from '../libs/imagekit/imageKit.js';
import User from '../models/User.js';
import Wallpaper from '../models/Wallpaper.js';

export const uploadWallpaper = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'user_not_found' });
        }

        const { name, size, resolution, category, tags } = req.body;

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