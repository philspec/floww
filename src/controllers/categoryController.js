import { categoryModel } from '../models/category.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const categoryController = {
  getAllCategories: asyncHandler(async (req, res) => {
    const categories = await categoryModel.getAll();
    res.json(categories);
  }),

  createCategory: asyncHandler(async (req, res) => {
    const { name, cat_type } = req.body;
    const result = await categoryModel.create({ name, cat_type });
    const categoryId = Number(result.lastInsertRowid)
    res.status(201).json({
      message: 'Category created successfully',
      categoryId
    });
  })
};