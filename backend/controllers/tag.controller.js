import Tag from '../models/tag.model.js';

export const getCategoryTags = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const tags = await Tag.find({ category: categoryId });
        return res.status(200).json({ tags });

    } catch (error) {
        console.error('Error fetching related tags:', error);
        return res.status(500).json({ error: 'error_fetching_related_tags' });
    }
};

export const addTag = async (req, res) => {
    const { name, image, category } = req.body;

    const newTag = new Tag({ name, image, category });

    newTag.save();

      return res.status(200).json({ newTag });
}