import type { FeaturedEventData } from "../types/event";

const API_URL = "http://localhost:3000/api/v1/featured-events";

export const featuredEventRepository = {
  async create(event: Omit<FeaturedEventData, "id">): Promise<FeaturedEventData> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (!res.ok) throw new Error("Failed to create Featured Event");
    return res.json();
  },

  async getAll(): Promise<FeaturedEventData[]> {
    const res = await fetch(API_URL);

    if (!res.ok) {
      console.error("Failed to fetch Featured Events");
      return [];
    }

    return res.json();
  },

  async getById(id: string): Promise<FeaturedEventData | undefined> {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
      console.warn(`Event not found with id ${id}`);
      return undefined;
    }

    return res.json();
  },

  async update(
    id: string,
    changes: Partial<Omit<FeaturedEventData, "id">>
  ): Promise<FeaturedEventData | undefined> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });

    if (!res.ok) {
      console.error("Failed to update Featured Event");
      return undefined;
    }

    return res.json();
  },

  async remove(id: string): Promise<boolean> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    return res.ok; 
  },
};
