import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const errors = { username: { message: '' }, email: { message: '' }, password: { message: '' }};

        if(!username.trim()) {
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

        if(!email.trim()) {
            errors.email.message = 'email_is_required';
        } else {
            const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegExp.test(email)) {
                errors.email.message = 'invalid_email_format';
            } else {
                const user = await User.findOne({ email });
                if (user) {
                    errors.email.message = 'email_is_already_taken';
                }
            }
        }

        if (!password.trim()) {
            errors.password.message = 'password_is_required';
        } else {
            const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
            if (!passwordRegExp.test(password)) {
                errors.password.message = 'invalid_password_format';
            }
        }

        if (errors.username.message || errors.email.message || errors.password.message) {
            return res.status(400).json({ errors });
        } 

        const passwordHashed = await bcrypt.hash(password, 10);

        const avatar = `https://api.dicebear.com/9.x/initials/svg?backgroundColor=ffcc00&seed=${username}`

        const newUser = new User({ username, email, password: passwordHashed, avatar });

        await newUser.save();
        res.status(201).json({ message: 'user_registered_successfully' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'error_registering_user' });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = { email: { message: '' }, password: { message: '' }};

        if (!email.trim()) {
            errors.email.message = 'email_is_required';
        }

        if (!password.trim()) {
            errors.password.message = 'password_is_required';
        }

        if (errors.email.message || errors.password.message) {
            return res.status(400).json({ errors });
        }

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'invalid_email_or_password' });
        }

        const userId = user._id;

        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ message: 'user_logged_in_successfully', token });

    } catch (error) {
        console.error('Error logging user in:', error);
        res.status(500).json({ error: 'error_logging_user_in' });
    }
};