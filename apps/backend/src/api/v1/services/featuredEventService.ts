import prisma from "../../../prismaClient";
import type { FeaturedEvent } from "@prisma/client";

export type FeaturedEventInput = {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export const featuredEventService = {
  async listAll(): Promise<FeaturedEvent[]> {
    return prisma.featuredEvent.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: number): Promise<FeaturedEvent | null> {
    return prisma.featuredEvent.findUnique({
      where: { id },
    });
  },

  async create(data: FeaturedEventInput): Promise<FeaturedEvent> {
    return prisma.featuredEvent.create({ data });
  },

  async update(id: number, data: FeaturedEventInput): Promise<FeaturedEvent> {
    return prisma.featuredEvent.update({
      where: { id },
      data,
    });
  },

  async remove(id: number): Promise<void> {
    await prisma.featuredEvent.delete({
      where: { id },
    });
  },
};
