import type { Event } from "../../types/EventList";
import { eventListRepository } from "../../repositories/eventListRepository";

export const EventListService = {

  async getAll(): Promise<Event[]> {
    return await eventListRepository.getAll();
  },

  async add(newEvent: Omit<Event, "id">): Promise<void> {
    const payload = {
      ...newEvent,
      date:
        typeof newEvent.date === "string"
          ? newEvent.date
          : newEvent.date.toISOString().split("T")[0],
    };
    await eventListRepository.add(payload);
  },

  async delete(id: number): Promise<void> {
    await eventListRepository.delete(id);
  },

  sortByDate(events: Event[]): Event[] {
    return [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  },

  async getUpcoming(): Promise<Event[]> {
    const all = await this.getAll();
    const today = new Date();
    return all.filter((e) => new Date(e.date) >= today);
  },

  async getMyEvents(token: string): Promise<Event[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/eventsList/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    return result.data ?? [];
  }
};
