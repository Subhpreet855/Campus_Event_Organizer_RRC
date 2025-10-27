import { useState, useContext } from "react"; 
import "./EventList.css";
import { SharedEventContext } from "../../App"; 
 
function EventList() {
  const { allEvents, loading } = useContext(SharedEventContext);
 
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
 
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
<h2>Upcoming Events</h2>
 
      <ul>
        {allEvents.map((item: any) => (
<li key={item.id}>
<h3>{item.title}</h3>
<p>Date: {item.date}</p>
<p>Location: {item.location}</p>
<p>Description: {item.description}</p>
</li>
        ))}
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