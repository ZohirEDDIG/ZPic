import imageKit from '../libs/imagekit/imageKit.js';
import User from '../models/user.model.js';
import Wallpaper from '../models/wallpaper.model.js';
import { validateUserData } from '../utils/validators/user.validator.js';

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'user_not_found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ error: 'error_getting_current_user' });
    }
};

export const editCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'user_not_found' });
        }

        const { username, website, about } = req.body;

        const errors = await validateUserData({ username, website, about });
        if (errors) return res.status(400).json({ errors });

        const avatarFile = req.file;
        let avatar = '';

        if (avatarFile) {
            avatar = (await imageKit.upload({ file: avatarFile.buffer, fileName: avatarFile.originalname, folder: '/zpic' })).url;
        }

        user.username = dataToEdit.username;

        if (dataToEdit.website) user.website = dataToEdit.website;

        if (dataToEdit.about) user.about = dataToEdit.about;

        if (avatarFile) user.avatar = avatar;

        await user.save();

        return res.status(200).json({ message: 'user_data_edited_successfully' });
    } catch (error) {
        console.error('Error editing user data:', error);
        res.status(500).json({ error: 'error_editing_user_data' });
  }
};

export const getCurrentUserUploads = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'user_not_found' });
        }

        const uploads = await Wallpaper.find({ author: user._id });

        return res.status(200).json({ uploads });
    } catch (error) {
        console.error('Error getting current user uploads:', error);
        res.status(500).json({ error: 'error_getting_current_user_uploads' });
    }
};

export const getCurrentUserBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'user_not_found' });
        }

        const bookmarks = await Wallpaper.find({ _id: { $in: user.bookmarks } });

        return res.status(200).json({ bookmarks });
    } catch (error) {
        console.error('Error getting current user bookmarks:', error);
        res.status(500).json({ error: 'error_getting_current_user_bookmarks' });
    }
};