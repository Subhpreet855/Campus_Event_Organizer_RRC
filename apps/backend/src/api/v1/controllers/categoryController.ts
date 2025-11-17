import { Request, Response, NextFunction } from "express";
import * as categoryService from "../services/categoryService";
import { successResponse } from "../models/responseModel";
import type { Category } from "../services/categoryService";

// Create a new category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newCategory: Category = await categoryService.createCategory(req.body);
    res
      .status(201)
      .json(successResponse(newCategory, "Category created successfully"));
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories: Category[] = await categoryService.getAllCategories();
    res
      .status(200)
      .json(successResponse(categories, "Categories fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const category = await categoryService.getCategoryById(id);

      if (!category) {
        res
          .status(404)
          .json(successResponse(null, "Category not found"));
        return;
      }

      res
        .status(200)
        .json(successResponse(category, "Category fetched successfully"));
    } catch (error) {
      next(error);
    }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const updatedCategory = await categoryService.updateCategory(id, req.body);

    res
      .status(200)
      .json(successResponse(updatedCategory, "Category updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await categoryService.deleteCategory(Number.parseInt(req.params.id, 10));
    res
      .status(200)
      .json(successResponse(null, "Category deleted successfully"));
  } catch (error) {
    next(error);
  }
};
