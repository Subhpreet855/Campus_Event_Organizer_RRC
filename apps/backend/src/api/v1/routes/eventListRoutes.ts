import express, { Router } from "express";
import * as eventController from "../controllers/eventListController";
import { validateRequest } from "../middleware/validateRequest";
import { 
    postEventSchema, 
    getEventByIdSchema, 
    deleteEventSchema 
} from "../validations/eventListValidation";

const router: Router = express.Router();

// To GET all events
router.get(
    "/eventsList",
    eventController.getAllEvents
);

// To GET event by ID
router.get(
    "/eventsList/:id",
    validateRequest(getEventByIdSchema),
    eventController.getEventById
);

// To CREATE new event
router.post(
    "/eventsList",
    validateRequest(postEventSchema),
    eventController.createEvent
);

// To UPDATE existing event
router.put(
    "/eventsList/:id",
    validateRequest(postEventSchema),
    eventController.updateEvent
);

// To DETELE event
router.delete(
    "/eventsList/:id",
    validateRequest(deleteEventSchema),
    eventController.deleteEvent
);

export default router;
