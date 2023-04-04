import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';
import mongoose from 'mongoose';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find().populate('categories');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw new Error('Invalid id');

    const task = await TaskModel.findById(id).populate('categories');
    if (!task) return res.status(404).json('Task not found');

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json(error);
  }
};

interface TaskBody {
  title: string;
  description?: string;
  categories?: string[];
}

export const createTask = async (
  req: Request<unknown, unknown, TaskBody, unknown>,
  res: Response
) => {
  const { title, description, categories } = req.body;

  try {
    if (!title) return res.status(400).json('Title is required');

    let newTask = await TaskModel.create({
      title,
      description,
      categories,
    });

    newTask = await newTask.populate('categories');

    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json(error);
  }
};

interface TaskParams {
  id: string;
}

interface TaskUpdateBody {
  title: string;
  description?: string;
  categories?: string;
  isDone: boolean;
}

export const updateTask = async (
  req: Request<TaskParams, unknown, TaskUpdateBody, unknown>,
  res: Response
) => {
  const { id } = req.params;
  const { title, description, categories, isDone } = req.body;

  try {
    const task = await TaskModel.findByIdAndUpdate(id, { title, description, categories, isDone });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await TaskModel.findByIdAndDelete(id);

    res.status(200).json(id);
  } catch (error) {
    res.status(400).json(error);
  }
};
