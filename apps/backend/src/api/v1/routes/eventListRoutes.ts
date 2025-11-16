import express, { Router } from "express";
import * as eventController from "../controllers/eventListController.ts";
import { validateRequest } from "../middleware/validateRequest";
import { 
    postEventSchema, 
    getEventByIdSchema, 
    deleteEventSchema 
} from "../validations/eventListValidation";

const router: Router = express.Router();

// To GET all events
router.get(
    "/events",
    eventController.getAllEvents
);

// To GET event by ID
router.get(
    "/events/:id",
    validateRequest(getEventByIdSchema),
    eventController.getEventById
);

// To CREATE new event
router.post(
    "/events",
    validateRequest(postEventSchema),
    eventController.createEvent
);

// To UPDATE existing event
router.put(
    "/events/:id",
    validateRequest(postEventSchema),
    eventController.updateEvent
);

// To DETELE event
router.delete(
    "/events/:id",
    validateRequest(deleteEventSchema),
    eventController.deleteEvent
);

export default router;
