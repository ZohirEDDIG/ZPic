import Category from '../models/category.model.js';

export const getCategories = async (_req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ error: 'Error fetching categories' });
    }
};