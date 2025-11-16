import Joi, { ObjectSchema } from "joi";

// For GET event by ID
export const getEventByIdSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "Event Id is required",
        "string.empty": "Event Id cannot be empty"
    })
});

// For POST or UPDATE event
export const postEventSchema: ObjectSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required",
        "string.empty": "Title cannot be empty"
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty"
    }),
    date: Joi.string().required().messages({
        "any.required": "Date is required",
        "string.empty": "Date cannot be empty"
    }),
    location: Joi.string().required().messages({
        "any.required": "Location is required",
        "string.empty": "Location cannot be empty"
    }),
    categoryId: Joi.string().optional(),
    id: Joi.string().optional()
});

// For DELETE event
export const deleteEventSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "Event Id is required",
        "string.empty": "Event Id cannot be empty"
    })
});
