import { useState } from "react";

type Props = {
  onAdd: (payload: { name: string; date: string; time: string; location: string; description: string }) => void;
};

export default function AddEventForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");     
  const [time, setTime] = useState("");     
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = name.trim().length >= 3 && location.trim().length >= 3;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAdd({ name, date, time, location, description });
    setName(""); setDate(""); setTime(""); setLocation(""); setDescription("");
  };

  return (
    <form className="add-event-form" onSubmit={submit} aria-label="Add Event">
      <h3>Add a Custom Event</h3>

      <label>
        Name*:
        <input value={name} onChange={e => setName(e.target.value)} required minLength={3} />
      </label>

      <label>
        Date:
        <input value={date} onChange={e => setDate(e.target.value)} placeholder="Oct 30, 2025" />
      </label>

      <label>
        Time:
        <input value={time} onChange={e => setTime(e.target.value)} placeholder="2:00 PM - 4:00 PM" />
      </label>

      <label>
        Location*:
        <input value={location} onChange={e => setLocation(e.target.value)} required minLength={3} />
      </label>

      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>

      <button type="submit" disabled={!canSubmit}>Add Event</button>
    </form>
  );
}
