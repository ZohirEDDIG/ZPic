import User from '../../models/user.model.js';

export const validateUserData = async (userDara) => {
    const { username, website, about } = userDara;
    const errors = { username: { message: '' }, website: { message: '' }, about: { message: '' }};

    if (!username?.trim()) {
        errors.username.message = 'username_is_required';
    } else {
        const usernameRegExp = /^[a-zA-Z0-9.-_@]{3,}$/;
        if (!usernameRegExp.test(username)) {
            errors.username.message = 'invalid_username_format';
        } else {
            const user = await User.findOne({ username });
            if (user) {
               errors.username.message = 'username_is_already_taken';
            }
        }
    }

    if (website?.trim()) {
        const websiteRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
        if (!websiteRegExp.test(website)) {
            userDataErrors.website = 'invalid_website_format';
        }
    }

    if (about?.trim()) {
        if (about.length > 120) {
            userDataErrors.about = 'about_cannot_exceed_120_characters';
        }
    }

    if (userDataErrors.username || userDataErrors.website || userDataErrors.about) {
        return errors;
    }

    return null;
};
