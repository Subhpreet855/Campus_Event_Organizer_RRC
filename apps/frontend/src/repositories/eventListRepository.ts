import { events, type Event } from "../data/EventListMockData";

let eventListData: Event[] = [...events];

export const eventListRepository = {
  getAll(): Event[] {
    return eventListData;
  },

  add(newEvent: Event): void {
    const exists = eventListData.find(
      (e) => e.title.toLowerCase() === newEvent.title.toLowerCase()
    );
    if (!exists) {
      eventListData.push(newEvent);
    }
  },

  delete(id: number): void {
    eventListData = eventListData.filter((e) => e.id !== id);
  },
};
