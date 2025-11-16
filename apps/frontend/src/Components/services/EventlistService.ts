import type { Event } from "../../data/EventListMockData";
import { eventListRepository } from "../../repositories/eventListRepository";

export const EventListService = {
  getAll(): Event[] {
    return eventListRepository.getAll();
  },

  add(newEvent: Event): void {
    eventListRepository.add(newEvent);
  },

  delete(id: number): void {
    eventListRepository.delete(id);
  },

  sortByDate(events: Event[]): Event[] {
    return [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  },

  getUpcoming(): Event[] {
    const today = new Date();
    const all = eventListRepository.getAll();
    return all.filter((e) => new Date(e.date) >= today);
  },
};
