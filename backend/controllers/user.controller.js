import ImageKit from '../libs/imagekit/imageKit.js';
import User from '../models/User.js';
import Wallpaper from '../models/Wallpaper.js';

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
}

export const editCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'user_not_found' });
        }

        const dataToEdit = { ... req.body };
        const userDataErrors = { username: '', website: '', about: '' };

        if (dataToEdit?.username) {
            if (dataToEdit.username === '') {
                userDataErrors.username = 'username_is_required';
            }
        } else {
            const usernameRegExp = /^[a-zA-Z0-9.-_@]{3,}$/;
            if (!usernameRegExp.test(dataToEdit.username)) {
                userDataErrors.username = 'invalid_username_format'; 
            }
        }

        if(dataToEdit?.website?.trim()) {
            const websiteRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
            if (!websiteRegExp.test(dataToEdit.website)) {
                userDataErrors.website = 'invalid_website_format';
            }
        }

        if(dataToEdit?.about?.trim()) {
            if (dataToEdit.about.length > 120) {
                userDataErrors.about =  'about_is_too_long';
            }
        }

        if (userDataErrors.username || userDataErrors.website || userDataErrors.about) {
            return res.status(400).json({ userDataErrors });
        }
        

        const avatarFile  = req.file;
        let avatar = '';

        if(avatarFile) {
            avatar = (await ImageKit.upload({
                file: avatarFile.buffer,
                fileName: avatarFile.originalname,
                folder: '/zpic',
            })).url;
        }


        if (dataToEdit.username) {
            user.username = dataToEdit.username;
        }

        if (dataToEdit.website) {
            user.website = dataToEdit.website;
        }

        if (dataToEdit.about) {
            user.about = dataToEdit.about;
        }

        if(avatarFile) {
            user.avatar = avatar;
            
        }

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