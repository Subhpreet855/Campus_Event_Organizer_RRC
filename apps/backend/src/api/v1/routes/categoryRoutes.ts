import express, { Router } from "express";
import { requireAuth } from "@clerk/express";

import * as categoryController from "../controllers/categoryController";
import { validateRequest } from "../middleware/validateRequest";

import {
  categorySchema,
  getCategoryByIdSchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidation";

const router: Router = express.Router();

router.get("/preferences", requireAuth(), categoryController.getUserCategoryPreferences);

router.put("/preferences", requireAuth(), categoryController.updateUserCategoryPreferences);

router.get("/", categoryController.getAllCategories);

router.get(
  "/:id",
  validateRequest(getCategoryByIdSchema),
  categoryController.getCategoryById
);

router.post(
  "/",
  validateRequest(categorySchema),
  categoryController.createCategory
);

router.put(
  "/:id",
  validateRequest(updateCategorySchema),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  validateRequest(deleteCategorySchema),
  categoryController.deleteCategory
);

export default router;
