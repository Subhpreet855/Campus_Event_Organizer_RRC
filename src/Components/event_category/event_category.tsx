import React, { useState } from "react";
import "../../Components/event_category/event_category.css";

function EventCategories() {
  const [categories, setCategories] = useState<string[]>([
    "Sports",
    "Workshops",
    "Social",
    "Academic",
    "Cultural",
  ]);
  const [input, setInput] = useState<string>("");

  // Add new category
  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (trimmedInput && !categories.includes(trimmedInput)) {
      setCategories([...categories, trimmedInput]);
      setInput("");
    }
  };

  // Remove category
  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  return (
    <section className="event-categories">
      <h2>Event Categories</h2>

      {/* Form Component */}
      <form onSubmit={handleAddCategory} className="category-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new category"
          required
        />
        <button type="submit">Add</button>
      </form>

      {/* List with Add/Remove */}
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <span>{category}</span>
            <button
              type="button"
              onClick={() => handleRemoveCategory(category)}
              className="remove-btn"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EventCategories;
