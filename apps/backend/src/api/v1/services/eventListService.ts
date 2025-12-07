import prisma from "../../../prismaClient";

// Fetch all events and include user data
export const fetchAllEvents = async () => {
  return prisma.event.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });
};

// Get event by ID
export const getEventById = async (id: number) => {
  return prisma.event.findUnique({
    where: { id },
    include: { user: true }
  });
};

// Create a new event
export const createEvent = async (eventData: {
  title: string;
  description: string;
  date: Date | string;
  location: string;
  categoryId?: number | null;
  userId?: string | null;
}) => {
  const data: any = {
    title: eventData.title,
    description: eventData.description,
    location: eventData.location,
    date: new Date(eventData.date)
  };

  // Optional category
  if (eventData.categoryId !== undefined && eventData.categoryId !== null) {
    data.categoryId = eventData.categoryId;
  }

  // Clerk userId is a string
  if (eventData.userId) {
    data.userId = eventData.userId;
  }

  return prisma.event.create({ data });
};

// Update event
export const updateEvent = async (
  id: number,
  eventData: {
    title: string;
    description: string;
    date: Date | string;
    location: string;
    categoryId?: number | null;
  }
) => {
  const data: any = {
    title: eventData.title,
    description: eventData.description,
    location: eventData.location,
    date: new Date(eventData.date)
  };

  if (eventData.categoryId !== undefined && eventData.categoryId !== null) {
    data.categoryId = eventData.categoryId;
  }

  return prisma.event.update({
    where: { id },
    data
  });
};

// Delete event
export const deleteEvent = async (id: number) => {
  return prisma.event.delete({
    where: { id }
  });
};

// Get all events created by a user
export const getEventsByUser = async (clerkUserId: string) => {
  return prisma.event.findMany({
    where: {
      userId: {
        equals: clerkUserId
      }
    },
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });
};
