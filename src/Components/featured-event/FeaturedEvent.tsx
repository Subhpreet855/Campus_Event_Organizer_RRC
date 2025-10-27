import React, { useState } from "react";
import "./FeaturedEvent.css";
import { featuredEvents as initialEvents } from "../../data/FeaturedEventData";

function FeaturedEvent() {
  const [events, setEvents] = useState(initialEvents);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !date || !time || !location || !description) {
      alert("Please fill in all fields before adding an event!");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      name,
      date,
      time,
      location,
      description,
    };

    setEvents([...events, newEvent]);

    setName("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  const handleRemoveEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <section className="featured-event">
      <h2>Upcoming Featured Events</h2>

      {/* Form Section */}
      <form className="add-event-form" onSubmit={handleAddEvent}>
        <h3>Add a New Event</h3>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>

      {}
      {events.map((event) => (
        <article className="event-card" key={event.id}>
          <h3>{event.name}</h3>
          <ul className="event-info">
            <li>
              <strong>Date:</strong> {event.date}
            </li>
            <li>
              <strong>Time:</strong> {event.time}
            </li>
            <li>
              <strong>Location:</strong> {event.location}
            </li>
          </ul>
          <p>{event.description}</p>
          <button
            className="remove-btn"
            onClick={() => handleRemoveEvent(event.id)}
          >
            Remove
          </button>
        </article>
      ))}
    </section>
  );
}

export default FeaturedEvent;
