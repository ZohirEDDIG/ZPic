import Tag from '../../models/tag.model.js';

export const validateWallpaperData = async (wallpaperData) => {
    const { wallpaper, name, resolution, category, tags } = wallpaperData;

    const errors = { wallpaper: { message: '' }, name: { message: '' }, resolution: { message: '' }, category: { message: '' }, tags: { message: '' } };

    if (!wallpaper) {
        errors.wallpaper.message = 'wallpaper_is_required';
    }

    if (!name?.trim()) {
        errors.name.message = 'name_is_required';
    }

    if (!resolution?.trim()) {
        errors.resolution.message = 'resolution_is_required';
    }

    if (!category?.trim()) {
        errors.category.message = 'category_is_required';
    } else {
        const category = await Category.findById(category);
        if (!category) {
            errors.category.message = 'category_not_found';
        }
    }

    if (!tags?.length) {
        errors.tags.message = 'tags_are_required';
    } else {
        const tags = await Tag.find({ _id: { $in: tags } });
        if (tags.length !== tags.length) {
            errors.tags.message = 'tags_not_found';
        }
    }

    if (errors.wallpaper.message || errors.name.message || errors.resolution.message || errors.category.message || errors.tags.message) {
        return errors;
    }

    return null;
};