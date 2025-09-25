import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateRegisterData, validateLoginData  } from '../utils/validators/auth.validator.js';


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const errors = validateRegisterData({ username, email, password });
        if (errors) return res.status(400).json({ errors });

        const passwordHashed = await bcrypt.hash(password, 10);

        const avatar = `https://api.dicebear.com/9.x/initials/svg?backgroundColor=ffcc00&seed=${username}`;

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

        const errors = validateLoginData({ email, password });
        if (errors) return res.status(400).json({ errors });


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