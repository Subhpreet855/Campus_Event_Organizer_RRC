
import type { FeaturedEventData } from "../types/event";
import { featuredEvents } from "../data/FeaturedEventData";


let data: FeaturedEventData[] = [...featuredEvents];
const makeId = () => `Event-${Date.now()}`;

export const featuredEventRepository = {

  async create(event: Omit<FeaturedEventData, "id">): Promise<FeaturedEventData> {
    const newEvent: FeaturedEventData = { ...event, id: makeId() };
    data.push(newEvent);
    return newEvent;
  },

  async getAll(): Promise<FeaturedEventData[]> {
    return [...data];
  },

  async getById(id: string): Promise<FeaturedEventData | undefined> {
    return data.find(e => e.id === id);
  },

  async update(
    id: string,
    changes: Partial<Omit<FeaturedEventData, "id">>
  ): Promise<FeaturedEventData | undefined> {
    const idx = data.findIndex(e => e.id === id);
    if (idx === -1) return undefined;
    const updated = { ...data[idx], ...changes };
    data[idx] = updated;
    return updated;
  },

  async remove(id: string): Promise<boolean> {
    const before = data.length;
    data = data.filter(e => e.id !== id);
    return data.length < before;
  },
};
