import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventListService";
import { successResponse } from "../models/responseModel";
import { clerkClient } from "@clerk/express";

const formatDate = (event: any) => ({
  ...event,
  date: new Date(event.date).toISOString().split("T")[0]
});

const getUserEmail = async (clerkUserId: string | null) => {
  if (!clerkUserId) return null;

  try {
    const user = await clerkClient.users.getUser(clerkUserId);
    return user.emailAddresses[0]?.emailAddress || null;
  } catch {
    return null;
  }
};

export const getAllEvents = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventService.fetchAllEvents();

    const withEmail = await Promise.all(
      events.map(async (e) => {
        const email = await getUserEmail(e.user?.clerkUserId ?? null);
        return {
          ...e,
          createdBy: email ?? null
        };
      })
    );

    res.status(200).json(
      successResponse(
        withEmail.map(formatDate),
        "Event list retrieved successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = (req as any).currentUser;

    if (!currentUser) {
      return res.status(401).json({
        message: "You must be logged in to add an event."
      });
    }

    const newEvent = await eventService.createEvent({
      ...req.body,
      userId: currentUser.id
    });

    const email = await getUserEmail(currentUser.id);

    const responseEvent = {
      ...formatDate(newEvent),
      createdBy: email ?? null
    };

    res.status(201).json(
      successResponse(responseEvent, "Event created successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await eventService.getEventById(Number(req.params.id));

    if (!event) {
      throw new Error("Event not found");
    }

    const email = await getUserEmail(event.user?.clerkUserId ?? null);

    const formatted = {
      ...formatDate(event),
      createdBy: email ?? null
    };

    res.json(successResponse(formatted, "Event retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await eventService.updateEvent(
      Number(req.params.id),
      req.body
    );

    res.status(200).json(
      successResponse(formatDate(updated), "Event updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await eventService.deleteEvent(Number(req.params.id));

    res
      .status(200)
      .json(successResponse(null, "Event deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const getMyEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = (req as any).currentUser;

    if (!currentUser) {
      throw new Error("Not authenticated");
    }

    const events = await eventService.getEventsByUser(currentUser.id);
    const email = await getUserEmail(currentUser.id);

    const formatted = events.map((e) => ({
      ...formatDate(e),
      createdBy: email ?? null
    }));

    res.status(200).json(
      successResponse(formatted, "User events retrieved successfully")
    );
  } catch (error) {
    next(error);
  }
};
