import { useState } from "react";
import { useEventState } from "../hooks/useEventState";
import { useEventForm } from "../hooks/useEventForm";
import EventItem from "./EventItem";
import "./EventList.css";

function EventList() {
  const { allEvents, loading, addEvent, removeEvent } = useEventState();
  const {
    title,
    date,
    location,
    description,
    setTitle,
    setDate,
    setLocation,
    setDescription,
    resetForm,
  } = useEventForm();

  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState<{ name: string; text: string }[]>([]);

  const filtered = allEvents.filter((event) => {
    const input = query.toLowerCase();
    return (
      event.title.toLowerCase().includes(input) ||
      event.location.toLowerCase().includes(input) ||
      event.description.toLowerCase().includes(input)
    );
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !date.trim() || !location.trim()) {
      return;
    }

    await addEvent({
      title,
      date,
      location,
      description,
    });

    resetForm();
  };

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !feedback.trim()) {
      return;
    }

    setFeedbackList((prev) => [...prev, { name, text: feedback }]);
    setName("");
    setFeedback("");
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <section className="event-list">
      <h2>Event List</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <form onSubmit={handleAdd} className="add-event-form">
        <h3>Add a New Event</h3>

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Event</button>
      </form>

      <ul>
        {filtered.length > 0 ? (
          filtered.map((event) => (
            <EventItem key={event.id} event={event} onRemove={removeEvent} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </ul>

      <h3>Share Your Feedback</h3>

      <form onSubmit={handleFeedback} className="feedback-form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {feedbackList.length > 0 && (
        <div className="submitted-box">
          <h4>Feedback Summary</h4>

          {feedbackList.map((item, idx) => (
            <div key={idx} className="feedback-item">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Feedback:</strong> {item.text}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EventList;
