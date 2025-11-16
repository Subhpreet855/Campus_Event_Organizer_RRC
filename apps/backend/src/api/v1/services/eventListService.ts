import { Event } from "@prisma/client";
import prisma from "../../../prismaClient";

export const fetchAllEvents = async (): Promise<Event[]> => {
    return prisma.event.findMany();
};

export const getEventById = async (id: number): Promise<Event | null> => {
    const event = await prisma.event.findUnique({
        where: {
            id: id
        }
    });

    if (!event) {
        return null;
    } else {
        return event;
    }
};

export const createEvent = async (eventData: {
    title: string;
    description: string;
    date: Date | string;
    location: string;
    categoryId?: number;
}): Promise<Event> => {
    const newEvent: Event = await prisma.event.create({
        data: {
            ...eventData,
            date: new Date(eventData.date)
        }
    });

    return newEvent;
};

export const updateEvent = async (
    id: number,
    eventData: {
        title: string;
        description: string;
        date: Date | string;
        location: string;
        categoryId?: number;
    }
): Promise<Event> => {
    const updatedEvent = await prisma.event.update({
        where: {
            id: id
        },
        data: {
            ...eventData,
            date: new Date(eventData.date)
        }
    });

    return updatedEvent;
};

export const deleteEvent = async (id: number): Promise<void> => {
    await prisma.event.delete({
        where: {
            id: id
        }
    });
};
