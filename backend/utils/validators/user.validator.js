import User from '../../models/user.model.js';

export const validateUserData = async (userDara) => {
    const { username, website, about } = userDara;
    const errors = { username: { message: '' }, website: { message: '' }, about: { message: '' }};

    if (!username?.trim()) {
        errors.username.message = 'Username is required';
    } else {
        const usernameRegExp = /^[a-zA-Z0-9.-_@]{3,}$/;
        if (!usernameRegExp.test(username)) {
            errors.username.message = 'Invalid username format';
        } else {
            const user = await User.findOne({ username });
            if (user) {
               errors.username.message = 'Username is already taken';
            }
        }
    }

    if (website?.trim()) {
        const websiteRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
        if (!websiteRegExp.test(website)) {
            userDataErrors.website = 'Invalid website format';
        }
    }

    if (about?.trim()) {
        if (about.length > 120) {
            userDataErrors.about = 'About cannot exceed 120 characters';
        }
    }

    if (userDataErrors.username || userDataErrors.website || userDataErrors.about) {
        return errors;
    }

    return null;
};