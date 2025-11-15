import { useState, useEffect } from "react";
import { useEventState } from "../hooks/useEventState";
import "./EventList.css";

function EventList() {
  const { allEvents, loading } = useEventState();
  const [query, setQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredEvents(allEvents);
    } else {
      const lower = query.toLowerCase();
      const filtered = allEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(lower) ||
          event.description.toLowerCase().includes(lower) ||
          event.location.toLowerCase().includes(lower)
      );
      setFilteredEvents(filtered);
    }
  }, [query, allEvents]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) return;
    setSubmitted(true);
  }

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <section className="event-list">
      <h2>Event List</h2>

      <input
        type="text"
        placeholder="Search events here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <ul>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>Date: {item.date}</p>
              <p>Location: {item.location}</p>
              <p>Description: {item.description}</p>
            </li>
          ))
        ) : (
          <p>No events found for your search.</p>
        )}
      </ul>

      <h3 style={{ marginTop: "1.5rem" }}>Share Your Feedback</h3>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="input-box">
          <label>Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSubmitted(false);
            }}
            required
          />
        </div>

        <div className="input-box">
          <label>Your Feedback:</label>
          <textarea
            rows={3}
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              setSubmitted(false);
            }}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="submitted-box">
          <h4>Feedback Summary</h4>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Feedback:</strong> {feedback}
          </p>
        </div>
      )}
    </section>
  );
}

export default EventList;
