import { useState } from "react";
import FeaturedEvent from "../Components/featured-event/FeaturedEvent";
import AddEventForm from "../Components/featured-event/AddEventForm";
import { featuredEvents as seed, type FeaturedEventData } from "../data/FeaturedEventData";

export default function FeaturedEventsPage() {
  const [events, setEvents] = useState<FeaturedEventData[]>(seed);

  const addEvent = (e: Omit<FeaturedEventData, "id">) => {
    const newEvent: FeaturedEventData = { id: crypto.randomUUID(), ...e };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <section>
      <AddEventForm onAdd={addEvent} />
      <FeaturedEvent
        events={events}
        onRemove={removeEvent}
      />
    </section>
  );
}
