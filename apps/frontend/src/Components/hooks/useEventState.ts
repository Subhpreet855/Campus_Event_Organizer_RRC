import { useState, useEffect } from "react";
import type { Event } from "../../types/EventList";
import { EventListService } from "../services/EventlistService";

export function useEventState() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = EventListService.getAll();
    setAllEvents(data);
    setLoading(false);
  }, []);

  const addEvent = (newEvent: Event) => {
    EventListService.add(newEvent);
    const updated = EventListService.getAll();
    setAllEvents(updated);
  };

  const removeEvent = (id: number) => {
    EventListService.delete(id);
    const updated = EventListService.getAll();
    setAllEvents(updated);
  };

  return { allEvents, loading, addEvent, removeEvent };
}
