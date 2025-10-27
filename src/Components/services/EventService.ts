import type { Event } from "../../types/event";
import { events } from "../../data/mockdata";
import { categoryRepository } from "../../repositories/categoryRepository";
import type { Category } from "../../data/mockdataCategories"; 
 
export const EventService = {
  /**
   * It Sorts a list of category names according to the alphabets.
   * helps to sort for A–Z, for Z–A
   * helps to sort list of category names
   */
  sortByName(list: string[], order: "asc" | "desc") {
    const sorted = [...list].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    return order === "asc" ? sorted : sorted.reverse();
  },
 
  /**
   * Sorts events by date.
   * array of Event objects
   * new sorted array of events
   */
  sortEventsByDate(events: Event[]): Event[] {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  },
 
  /**
   * Finds all upcoming events.
   * filtered array of Event objects
   */
  getUpcomingEvents(): Event[] {
    const today = new Date();
    return events.filter((e) => new Date(e.date) >= today);
  },
 
  /**
   * Gets all event categories from repository
   */
  getAllCategories(): Category[] {
    return categoryRepository.getAll();
  },
 
  /**
   * Adds a new category
   */
  addCategory(newCategory: Category): void {
    categoryRepository.add(newCategory);
  },
 
  /**
   * Deletes a category
   */
  removeCategory(id: number): void {
    categoryRepository.delete(id);
  },
};