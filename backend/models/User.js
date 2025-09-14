import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minLength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    avatar: { type: String, default: '' },
    about: { type: String, default: '', maxLength: 120 },
    website: { type: String, default: '' },
    googleAuth: { type: Boolean, default: false }
})

const UserModel = model('User', userSchema);

export default UserModel;