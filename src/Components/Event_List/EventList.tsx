import { events } from "../../data/events"; // I imported data from Event.ts file
import "./EventList.css";

function EventList() {
  // this function is returning  a section with a className
  return (
    <section className="event-list">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>Date: {item.date}</p>
            <p>Location: {item.location}</p>
            <p>Description: {item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EventList;
