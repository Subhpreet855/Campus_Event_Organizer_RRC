import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventListService";
import { successResponse } from "../models/responseModel";
import { Event } from "@prisma/client";

export const getAllEvents = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events: Event[] = await eventService.fetchAllEvents();
        res.status(200).json(
            successResponse(events, "Events List retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const event = await eventService.getEventById(Number.parseInt(req.params.id));

        if (event) {
            res.json(successResponse(event, "Event retrieved successfully"));
        } else {
            throw new Error("Event not found");
        }
    } catch (error) {
        next(error);
    }
};

export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newEvent = await eventService.createEvent(req.body);
        res.status(201)
            .json(successResponse(newEvent, "Event created successfully"));
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedEvent = await eventService.updateEvent(
            Number.parseInt(req.params.id),
            req.body
        );
        res.status(200)
            .json(successResponse(updatedEvent, "Event updated successfully"));
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await eventService.deleteEvent(Number.parseInt(req.params.id));
        res.status(200)
            .json(successResponse(null, "Event deleted successfully"));
    } catch (error) {
        next(error);
    }
};
