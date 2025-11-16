import type { Event } from "../../types/EventList";

const API_URL = "http://localhost:3000/api/v1/eventslist";

export const EventListService = {

  async getAll(): Promise<Event[]> {
    const response = await fetch(API_URL);
    const result = await response.json();
    return result.data;
  },

  async add(newEvent: Omit<Event, "id">): Promise<void> {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
  },

  async delete(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
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
