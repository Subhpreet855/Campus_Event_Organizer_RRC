import { useState, useEffect } from "react";
import { events } from "../../data/mockdata"; 
import type { Event } from "../../types/event";
 
export function useEventState() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    setAllEvents(events);
    setLoading(false);
  }, []);
 
  const addEvent = (newEvent: Event) => {
    setAllEvents((prev) => [...prev, newEvent]);
  };
 
  const removeEvent = (id: number) => {
    setAllEvents((prev) => prev.filter((e) => e.id !== id));
  };
 
  return { allEvents, loading, addEvent, removeEvent };
}