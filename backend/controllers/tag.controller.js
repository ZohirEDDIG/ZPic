import Category from '../models/category.model.js';
import Tag from '../models/tag.model.js';

export const getCategoryTags = async (req, res) => {
    try {
        if (req?.params?.category) {
            const categoryDoc = await Category.findOne({ name: req?.params?.category });
            if (!categoryDoc) {
                return res.status(404).json({ error: 'Category not found' });
            }

            const tags = await Tag.find({ category: categoryDoc._id });
            return res.status(200).json({ tags });
        }
        
        const categoryId = req.params.categoryId;
        
        const tags = await Tag.find({ category: categoryId });
        return res.status(200).json({ tags });
    } catch (error) {
        console.error('Error fetching related tags:', error);
        return res.status(500).json({ error: 'Error fetching related tags'});
    }
};