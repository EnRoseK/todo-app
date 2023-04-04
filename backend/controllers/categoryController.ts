import { Request, Response } from 'express';
import CategoryModel from '../models/categoryModel';
import mongoose from 'mongoose';
import slugify from 'slugify';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw new Error('Invalid id!');

    const category = await CategoryModel.findById(id);
    if (!category) throw new Error('Category not found');

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

interface CategoryBody {
  name: string;
  color?: string;
}

export const createCategory = async (
  req: Request<unknown, unknown, CategoryBody, unknown>,
  res: Response
) => {
  const { name, color } = req.body;

  try {
    if (!name) throw new Error('Name is required');

    const newCategory = await CategoryModel.create({
      name,
      color,
      slug: slugify(name).toLowerCase(),
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

interface CategoryParams {
  id: string;
}

export const updateCategory = async (
  req: Request<CategoryParams, unknown, CategoryBody, unknown>,
  res: Response
) => {
  const { id } = req.params;
  const { name, color } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID');
    if (!name) throw new Error('Name is required');

    const isNameExist = await CategoryModel.find({
      slug: slugify(name).toLowerCase(),
      _id: { $ne: id },
    });
    if (isNameExist)
      throw new Error(`Category named ${name} is already registered. Try another name`);

    const category = await CategoryModel.findById(id);
    if (!category) throw new Error('Category not found!');

    category.name = name;
    category.slug = slugify(name).toLowerCase();
    category.color = color;

    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID');

    const category = await CategoryModel.findById(id);
    if (!category) throw new Error('Category not found');

    await category.deleteOne();

    res.status(200).json(id);
  } catch (error) {
    res.status(400).json(error);
  }
};
