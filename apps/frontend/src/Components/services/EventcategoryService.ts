import type { Event } from "../../types/event";
import { events } from "../../data/EventListMockData";
import { categoryRepository } from "../../repositories/categoryRepository";
import type { Category } from "../../data/mockdataCategories"; 
 
export const EventService = {
  sortByName(list: string[], order: "asc" | "desc") {
    const sorted = [...list].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    return order === "asc" ? sorted : sorted.reverse();
  },

  sortEventsByDate(events: Event[]): Event[] {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  },

  getUpcomingEvents(): Event[] {
    const today = new Date();
    return events.filter((e) => new Date(e.date) >= today);
  },

  async getAllCategories(): Promise<Category[]> {
    return categoryRepository.getAll();
  },

  async addCategory(name: string, description?: string): Promise<Category> {
    return categoryRepository.add(name, description);
  },

  async removeCategory(id: number): Promise<void> {
    return categoryRepository.delete(id);
  },
};