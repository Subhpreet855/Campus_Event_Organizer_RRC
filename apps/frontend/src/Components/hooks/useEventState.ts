import { useState, useEffect } from "react";
import type { Event } from "../../types/EventList";
import { EventListService } from "../services/EventlistService";
import { useAuth } from "@clerk/clerk-react";

export function useEventState() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const formatEvents = (events: Event[]) =>
    events.map((e) => ({
      ...e,
      date:
        typeof e.date === "string"
          ? e.date
          : new Date(e.date).toISOString().split("T")[0]
    }));

  useEffect(() => {
    const load = async () => {
      const events = await EventListService.getAll();
      setAllEvents(formatEvents(events));
      setLoading(false);
    };

    load();
  }, []);

  const addEvent = async (newEvent: Omit<Event, "id">) => {
    const token = await getToken();
    await EventListService.add(newEvent, token ?? null);

    const updated = await EventListService.getAll();
    setAllEvents(formatEvents(updated));
  };

  const removeEvent = async (id: number) => {
    const token = await getToken();
    await EventListService.delete(id, token ?? null);

    const updated = await EventListService.getAll();
    setAllEvents(formatEvents(updated));
  };

  return { allEvents, loading, addEvent, removeEvent };
}
