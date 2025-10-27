import type { Event } from "../..//types/event";
import { events } from "../../data/mockdata";

export const EventService = {

  /**
   * Sorts a list of category names according to the alphabets.
   * @param list - array of strings (category names)
   * @param order - for A–Z,  for Z–A
   * @returns sorted list of category names
   */

  sortByName(list: string[], order: "asc" | "desc") {
    const sorted = [...list].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    return order === "asc" ? sorted : sorted.reverse();
  },
 
  /**
   * Sorts events by date.
   * @param events - array of Event objects
   * @returns new sorted array of events
   */

  sortEventsByDate(events: Event[]): Event[] {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  },
 
  /**
   * Finds all upcoming events.
   * @returns filtered array of Event objects
   */

  getUpcomingEvents(): Event[] {
    const today = new Date();
    return events.filter((e) => new Date(e.date) >= today);
  },
};

 