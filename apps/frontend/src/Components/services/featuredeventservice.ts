import type { FeaturedEventData } from "../../types/event";
import { featuredEventRepository } from "../../repositories/featuredeventrepository";

export const featuredEventService = {
  async listAll(): Promise<FeaturedEventData[]> {
    return featuredEventRepository.getAll();
  },

  async getById(id: string) {
    return featuredEventRepository.getById(id);
  },

  async add(event: Omit<FeaturedEventData, "id">) {
    return featuredEventRepository.create(event);
  },

  async update(id: string, changes: Partial<Omit<FeaturedEventData, "id">>) {
    return featuredEventRepository.update(id, changes);
  },

  async remove(id: string) {
    return featuredEventRepository.remove(id);
  },
};