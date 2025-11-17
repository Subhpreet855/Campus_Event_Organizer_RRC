import Joi, { ObjectSchema } from "joi";

export const getCategoryByIdSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Category Id is required",
    "string.empty": "Category Id cannot be empty",
  }),
});

export const postCategorySchema: ObjectSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Category name is required",
    "string.empty": "Category name cannot be empty",
  }),

  description: Joi.string().optional(),

  id: Joi.string().optional(),
});

export const deleteCategorySchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Category Id is required",
    "string.empty": "Category Id cannot be empty",
  }),
});

export const updateCategorySchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Category Id is required",
    "string.empty": "Category Id cannot be empty",
  }),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
}).or("name", "description").messages({
  "object.missing": "At least one of name or description must be provided",
});


export const categorySchema: ObjectSchema = postCategorySchema;
