import { useEffect, useState } from "react";
import { events } from "../data/EventList";
import type { Event } from "../types/EventList";


export function useFilteredEvents() {
  const [query, setQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // Runs again every time the user types in the search box
  useEffect(() => {
    // only search if 2+ characters
    if (query.trim().length < 2) {
      setFilteredEvents(events);
      return;
    }

    const lower = query.toLowerCase();
    const result = events.filter(
      (evt) =>
        evt.title.toLowerCase().includes(lower) ||
        evt.description.toLowerCase().includes(lower) ||
        evt.location.toLowerCase().includes(lower)
    );
    setFilteredEvents(result);
  }, [query]);

  return { filteredEvents, query, setQuery };
}
