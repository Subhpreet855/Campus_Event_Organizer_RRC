import type { FeaturedEventData } from "../../data/FeaturedEventData";
import "./FeaturedEvent.css";

type Props = {
  events: FeaturedEventData[];
  onRemove: (id: string) => void;
};

export default function FeaturedEvent({ events, onRemove }: Props) {
  return (
    <section className="featured-event">
      <h2>Upcoming Featured Events</h2>

      {events.map((event) => (
        <article className="event-card" key={event.id}>
          <h3 className="event-title">{event.name}</h3>
          <ul className="event-info">
            <li><strong>Date:</strong> {event.date}</li>
            <li><strong>Time:</strong> {event.time}</li>
            <li><strong>Location:</strong> {event.location}</li>
          </ul>
          <p>{event.description}</p>

          <div className="event-actions">
            <button className="danger" onClick={() => onRemove(event.id)}>
              Remove
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
