import express, { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { 
    postEventSchema,
    getEventByIdSchema,
    deleteEventSchema
} from "../validations/eventListValidation";
import * as eventController from "../controllers/eventListController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import { requireAuth } from "@clerk/express";

const router: Router = express.Router();

// HTTP Request authorization header includes session token
// this is used by Clerk in the back-end to get the user's id from Clerk
// we store it in our database to manage user-specific data in our app

// Get all events public
router.get(
    "/eventsList",
    findOrCreateUser,
    eventController.getAllEvents
);

// Get events for the logged-in user
router.get(
    "/eventsList/user",
    requireAuth(),
    findOrCreateUser,
    eventController.getMyEvents
);

// Get event by id public
router.get(
    "/eventsList/:id",
    validateRequest(getEventByIdSchema),
    eventController.getEventById
);

// Create new event authenticated only
router.post(
    "/eventsList",
    requireAuth(),
    findOrCreateUser,
    validateRequest(postEventSchema),
    eventController.createEvent
);

// Update event authenticated only
router.put(
    "/eventsList/:id",
    requireAuth(),
    findOrCreateUser,
    validateRequest(postEventSchema),
    eventController.updateEvent
);

// Delete event authenticated only
router.delete(
    "/eventsList/:id",
    requireAuth(),
    findOrCreateUser,
    validateRequest(deleteEventSchema),
    eventController.deleteEvent
);

export default router;
