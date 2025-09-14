import ImageKit from '../libs/imagekit/imageKit.js';
import User from '../models/User.js';

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

        const avatarFile  = req.file;
        let avatar = '';

        if(avatarFile) {
            avatar = (await ImageKit.upload({
                file: avatarFile.buffer,
                fileName: avatarFile.originalname,
                folder: '/zpic',
            })).url;
        }

        const dataToEdit = { ... req.body, avatar };

        if (dataToEdit.username) {
            user.username = dataToEdit.username;
        }

        if (dataToEdit.website) {
            user.website = dataToEdit.website;
        }

        if (dataToEdit.about) {
            user.about = dataToEdit.about;
        }

        if(dataToEdit.avatar) {
            user.avatar = dataToEdit.avatar;
        }

        await user.save();

        return res.status(200).json({ message: 'user_data_edited_successfully' });

    } catch (error) {
        console.error('Error editing current user data:', error);
        res.status(500).json({ error: 'error_editing_current_user_data' });
    }
};