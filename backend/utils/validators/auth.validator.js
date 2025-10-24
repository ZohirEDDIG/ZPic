import User from '../../models/user.model.js';

export const validateRegisterData = async (registerData) => {
    const { username, email, password } = registerData;
    const errors = { username: { message: '' }, email: { message: '' }, password: { message: '' }};

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

    if (!email?.trim()) {
        errors.email.message = 'Email is required';
    } else {
        const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegExp.test(email)) {
            errors.email.message = 'Invalid email format';
        } else {
            const user = await User.findOne({ email });
            if (user) {
                errors.email.message = 'Email is already taken';
            }
        }
    }

    if (!password?.trim()) {
        errors.password.message = 'Password is required';
    } else {
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
        if (!passwordRegExp.test(password)) {
            errors.password.message = 'Invalid password format';
        }
    }

    if (errors.username.message || errors.email.message || errors.password.message) {
        return errors;
    }

    return null;
};

export const validateLoginData = async (loginData) => {
    const { email, password } = loginData;
    const errors = { email: { message: '' }, password: { message: '' } };

    if (!email?.trim()) {
        errors.email.message = 'Email is required';
    }

    if (!password?.trim()) {
        errors.password.message = 'Password is required';
    }

    if (errors.email.message || errors.password.message) {
        return errors;
    }

    return null;
};