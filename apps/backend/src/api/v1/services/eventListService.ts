import prisma from "../../../prismaClient";

export const fetchAllEvents = async () => {
  return prisma.event.findMany();
};

export const getEventById = async (id: number) => {
  return prisma.event.findUnique({
    where: { id }
  });
};

export const createEvent = async (eventData: {
  title: string;
  description: string;
  date: Date | string;
  location: string;
  categoryId?: number;
  userId?: number | null;
}) => {
  return prisma.event.create({
    data: {
      ...eventData,
      date: new Date(eventData.date)
    }
  });
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
) => {
  return prisma.event.update({
    where: { id },
    data: {
      ...eventData,
      date: new Date(eventData.date)
    }
  });
};

export const deleteEvent = async (id: number) => {
  await prisma.event.delete({
    where: { id }
  });
};

export const getEventsByUser = async (userId: number) => {
  return prisma.event.findMany({
    where: { userId }
  });
};
