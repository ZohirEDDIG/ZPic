import { Schema, model } from 'mongoose';

const wallpaperSchema = new Schema({
    wallpaper: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, required: true },
    resolution: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: { type: [Schema.Types.ObjectId], ref: 'Tag', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Wallpaper = model('Wallpaper', wallpaperSchema);

export default Wallpaper;