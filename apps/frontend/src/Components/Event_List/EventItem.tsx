function EventItem({ event, onRemove }: any) {
  return (
    <li>
      <h3>{event.title}</h3>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Description: {event.description}</p>

      <button className="delete-btn" onClick={() => onRemove(event.id)}>
        Remove
      </button>
    </li>
  );
}

export default EventItem;
