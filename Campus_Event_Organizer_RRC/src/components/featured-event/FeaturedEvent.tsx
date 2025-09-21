import "./FeaturedEvent.css";
import { featuredEvents } from "../../data/FeaturedEventData"; // Imported data from FeaturedEvent.tsx

function FeaturedEvent() {
  return (
    <section className="featured-event">
      <h2>Upcoming Featured Events</h2>

      {featuredEvents.map((event) => (
        <article className="event-card" key={event.id}>
          <h3>{event.name}</h3>
          <ul className="event-info">
            <li><strong>Date:</strong> {event.date}</li>
            <li><strong>Time:</strong> {event.time}</li>
            <li><strong>Location:</strong> {event.location}</li>
          </ul>
          <p>{event.description}</p>
        </article>
      ))}
    </section>
  );
}

export default FeaturedEvent;
