import { Request, Response } from 'express';
import User from '../models/User'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type  RegisterErrors = {
    username?: string;
    email?: string;
    password?: string;
}


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const errors: RegisterErrors = {}

        if(!username) {
            errors.username = 'username_is_required';
        } else {
            const usernameRegExp = /^[a-zA-Z0-9.-_@]{3,}$/;
            if (!usernameRegExp.test(username)) {
                errors.username = 'invalid_username_format';
            } else {
                const user = await User.findOne({ username });
                if (user) {
                    errors.username = 'username_is_already_taken';
                }
            }
        }

        if(!email) {
            errors.email = 'email_is_required';
        } else {
            const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegExp.test(email)) {
                errors.email = 'invalid_email_format';
            } else {
                const user = await User.findOne({ email });
                if (user) {
                    errors.email = 'email_is_already_taken';
                }
            }
        }

        if(!password) {
            errors.password = 'password_is_required';
        } else {
            const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
            if (!passwordRegExp.test(password)) {
                errors.password = 'invalid_password_format';
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        } 

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: passwordHashed });

        await newUser.save();
        res.status(201).json({ message: 'user_registered_successfully' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'internal_server_error' });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const errors: RegisterErrors = {}

        if(!email) {
            errors.email = 'email_is_required';
        }

        if(!password) {
            errors.password = 'password_is_required';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const user = await User.findOne({ email });

        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'invalid_email_or_password' });
        }

        const token = jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: '24h' });

        res.status(200).json({ message: 'user_logged_in_successfully', token });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'internal_server_error' });
    }
};