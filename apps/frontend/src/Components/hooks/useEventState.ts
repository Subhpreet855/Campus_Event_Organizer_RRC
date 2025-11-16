import { useState, useEffect } from "react";
import type { Event } from "../../types/EventList";
import { EventListService } from "../services/EventlistService";

export function useEventState() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await EventListService.getAll();

      const formatted = data.map(e => ({
        ...e,
        date: typeof e.date === "string"
          ? e.date
          : new Date(e.date).toISOString().split("T")[0]
      }));

      setAllEvents(formatted);
      setLoading(false);
    };

    loadEvents();
  }, []);

  const addEvent = async (newEvent: Event) => {
    await EventListService.add(newEvent);
    const updated = await EventListService.getAll();

    const formatted = updated.map(e => ({
      ...e,
      date: typeof e.date === "string"
        ? e.date
        : new Date(e.date).toISOString().split("T")[0]
    }));

    setAllEvents(formatted);
  };

  const removeEvent = async (id: number) => {
    await EventListService.delete(id);
    const updated = await EventListService.getAll();

    const formatted = updated.map(e => ({
      ...e,
      date: typeof e.date === "string"
        ? e.date
        : new Date(e.date).toISOString().split("T")[0]
    }));

    setAllEvents(formatted);
  };

  return { allEvents, loading, addEvent, removeEvent };
}
