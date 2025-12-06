import type { Event } from "../../types/EventList";
import { eventListRepository } from "../../repositories/eventListRepository";

export const EventListService = {

  async getAll(): Promise<Event[]> {
    const events = await eventListRepository.getAll();
    return events;
  },

  async add(newEvent: Omit<Event, "id">): Promise<void> {
    const payload = {
      ...newEvent,
      date: typeof newEvent.date === "string"
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
};
