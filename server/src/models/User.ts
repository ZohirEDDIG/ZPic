import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatar: string;
    about: string;
    website: string;
    googleAuth: boolean
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: "" },
    about: { type: String, maxLength: 200, default: "" },
    website: { type: String, default: "" },
    googleAuth: { type: Boolean, default: false }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;