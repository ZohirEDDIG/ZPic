import { Schema, model } from 'mongoose';

const TagSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

TagSchema.index({ name: 1, category: 1 }, { unique: true });

const Tag = model('Tag', TagSchema);

export default Tag;