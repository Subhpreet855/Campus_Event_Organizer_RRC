import type { Event } from "../../types/EventList";
import { eventListRepository } from "../../repositories/eventListRepository";

export const EventListService = {
  async getAll(): Promise<Event[]> {
    return await eventListRepository.getAll();
  },

  async add(newEvent: Omit<Event, "id">, token: string | null): Promise<void> {
    await eventListRepository.add(newEvent, token);
  },

  async delete(id: number, token: string | null): Promise<void> {
    await eventListRepository.delete(id, token);
  }
};
