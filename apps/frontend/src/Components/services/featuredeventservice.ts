import type { FeaturedEventData } from "../../types/event";
import { featuredEventRepository } from "../../repositories/featuredeventrepository";

export const featuredEventService = {
  async listAll(): Promise<FeaturedEventData[]> {
    try {
      return await featuredEventRepository.getAll();
    } catch (err) {
      console.error("Service Error: Failed to fetch featured events:", err);
      return [];
    }
  },

  async getById(id: string) {
    try {
      return await featuredEventRepository.getById(id);
    } catch (err) {
      console.error(`Service Error: Failed to fetch event ${id}:`, err);
      return null;
    }
  },

  async add(event: Omit<FeaturedEventData, "id">) {
    try {
      return await featuredEventRepository.create(event);
    } catch (err) {
      console.error("Service Error: Failed to create event:", err);
      throw err;
    }
  },

  async update(id: string, changes: Partial<Omit<FeaturedEventData, "id">>) {
    try {
      return await featuredEventRepository.update(id, changes);
    } catch (err) {
      console.error(`Service Error: Failed to update event ${id}:`, err);
      throw err;
    }
  },

  async remove(id: string) {
    try {
      return await featuredEventRepository.remove(id);
    } catch (err) {
      console.error(`Service Error: Failed to delete event ${id}:`, err);
      return false;
    }
  },
};
