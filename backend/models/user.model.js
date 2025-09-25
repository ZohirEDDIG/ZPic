import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minLength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    avatar: { type: String, default: '' },
    about: { type: String, default: '', maxLength: 120 },
    website: { type: String, default: '' },
    uploads: { type: [], default: [] },
    bookmarks: { type: [], default: [] },
    googleAuth: { type: Boolean, default: false },
    facebookAuth: { type: Boolean, default: false },
}, { timestamps: true });

const User = model('User', userSchema);

export default User;