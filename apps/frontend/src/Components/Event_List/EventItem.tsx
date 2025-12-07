import { useUser } from "@clerk/clerk-react";

function EventItem({ event, onRemove }: any) {
  const { user } = useUser();

  const creator = event.createdBy ?? null;
  const currentEmail = user?.primaryEmailAddress?.emailAddress;
  const canRemove = currentEmail && creator && currentEmail === creator;

  return (
    <li className="event-item">
      <h3>{event.title}</h3>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Description: {event.description}</p>

      {creator && (
        <p><strong>Created By:</strong> {creator}</p>
      )}

      {canRemove && (
        <button className="delete-btn" onClick={() => onRemove(event.id)}>
          Remove
        </button>
      )}
    </li>
  );
}

export default EventItem;
