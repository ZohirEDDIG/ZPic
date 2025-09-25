import Tag from '../models/Tag.js';

export const getCategoryTags = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const tags = await Tag.find({ category: categoryId });
        return res.status(200).json({ tags });

    } catch (error) {
        console.error('Error fetching tags:', error);
        return res.status(500).json({ error: 'error_fetching_tags' });
    }
};