import Tag from '../../models/tag.model.js';
import Category from '../../models/category.model.js';

export const validateWallpaperData = async (wallpaperData) => {
    const { wallpaper, name, resolution, category, tags } = wallpaperData;

    const errors = { wallpaper: { message: '' }, name: { message: '' }, resolution: { message: '' }, category: { message: '' }, tags: { message: '' } };

    if (!wallpaper) {
        errors.wallpaper.message = 'Wallpaper is required';
    }

    if (!name?.trim()) {
        errors.name.message = 'Name is required';
    }

    if (!resolution?.trim()) {
        errors.resolution.message = 'Resolution is required';
    }

    if (!category?.trim()) {
        errors.category.message = 'Category is required';
    } else {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            errors.category.message = 'Category not found';
        }
    }

    if (!tags?.length) {
        errors.tags.message = 'Tags are required';
    } else {
        const tagsExists = await Tag.find({ _id: { $in: tags } });
        if (tags.length !== tagsExists.length) {
            errors.tags.message = 'Tags not found';
        }
    }

    if (errors.wallpaper.message || errors.name.message || errors.resolution.message || errors.category.message || errors.tags.message) {
        return errors;
    }

    return null;
};