import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventListService";
import { successResponse } from "../models/responseModel";

const formatEventDate = (event: { date: string | Date; [key: string]: any }) => ({
    ...event,
    date: new Date(event.date).toISOString().split("T")[0]
});

export const getAllEvents = async(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events = await eventService.fetchAllEvents();
        const formatted = events.map(formatEventDate);

        res.status(200)
            .json(successResponse(formatted, "Event list retrieved successfully"));
    } catch(error) {
        next(error);
    }
}

export const getEventById = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const event = await eventService.getEventById(
            Number.parseInt(req.params.id)
        );

        if(event) {
            const formatted = formatEventDate(event);
            res.json(successResponse(formatted, "Event retrieved successfully"));
        } else {
            throw new Error("Event not found");
        }
    } catch(error) {
        next(error);
    }
}

export const createEvent = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const currentUser = (req as any).currentUser;

        const newEvent = await eventService.createEvent({
            ...req.body,
            userId: currentUser ? currentUser.id : null
        });

        const formatted = formatEventDate(newEvent);

        res.status(201)
            .json(successResponse(formatted, "Event created successfully"));
    } catch(error) {
        next(error);
    }
}

export const updateEvent = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedEvent = await eventService.updateEvent(
            Number.parseInt(req.params.id),
            req.body
        );

        const formatted = formatEventDate(updatedEvent);

        res.status(200)
            .json(successResponse(formatted, "Event updated successfully"));
    } catch(error) {
        next(error);
    }
}

export const deleteEvent = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await eventService.deleteEvent(Number.parseInt(req.params.id));

        res.status(200)
            .json(successResponse(null, "Event deleted successfully"));
    } catch(error) {
        next(error);
    }
}

export const getMyEvents = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const currentUser = (req as any).currentUser;

        if(!currentUser) {
            throw new Error("Not authenticated");
        }

        const events = await eventService.getEventsByUser(currentUser.id);
        const formatted = events.map(formatEventDate);

        res.status(200)
            .json(successResponse(formatted, "User events retrieved successfully"));
    } catch(error) {
        next(error);
    }
}
