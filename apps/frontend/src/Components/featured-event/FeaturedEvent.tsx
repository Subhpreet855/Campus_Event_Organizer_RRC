import React, { useMemo, useState } from "react";
import "./FeaturedEvent.css";
import type { FeaturedEventData } from "../../types/event";
import { useFeaturedEvents } from "../hooks/useFeaturedEvents";

function FeaturedEvent() {
  const { items, loading, addFeatured, remove } = useFeaturedEvents();

  
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [query, setQuery] = useState("");

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((ev: FeaturedEventData) =>
      `${ev.name} ${ev.location} ${ev.description}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !time || !location || !description) {
      alert("Please fill in all fields before adding an event!");
      return;
    }

    await addFeatured({ name, date, time, location, description });

    setName("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  const handleRemoveEvent = async (id: string) => {
    await remove(id);
  };

  return (
    <section className="featured-event">
      <h2>Upcoming Featured Events</h2>

      <div className="filter-bar" style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Search events by name, location, or description..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: ".6rem .8rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
      </div>

      <form className="add-event-form" onSubmit={handleAddEvent}>
        <h3>Add a New Event</h3>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <input type="date" value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)} />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>

      {loading && <p>Loading events…</p>}

      {!loading &&
        visibleItems.map((event: FeaturedEventData) => (
          <article className="event-card" key={event.id}>
            <h3>{event.name}</h3>
            <ul className="event-info">
              <li><strong>Date:</strong> {event.date}</li>
              <li><strong>Time:</strong> {event.time}</li>
              <li><strong>Location:</strong> {event.location}</li>
            </ul>
            <p>{event.description}</p>
            <button className="remove-btn" onClick={() => handleRemoveEvent(event.id)}>
              Remove
            </button>
          </article>
        ))}
    </section>
  );
}

export default FeaturedEvent;
