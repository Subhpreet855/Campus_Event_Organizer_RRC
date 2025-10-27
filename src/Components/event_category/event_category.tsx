import React, { useState, useContext } from "react";
import "./event_category.css";
import { useListControls } from "../hooks/useListControls";
import { EventService } from "../services/EventService";
import type { Event } from "../../types/event";
import { SharedEventContext } from "../../App";

function EventCategories() {
  const [categories, setCategories] = useState<string[]>([
    "Sports",
    "Workshops",
    "Social",
    "Academic",
    "Cultural",
  ]);
  const [input, setInput] = useState<string>("");

  const {
    searchValue,
    setSearchValue,
    sortBy,
    setSortBy,
    validateEventItem,
    validationError,
  } = useListControls();

  const { allEvents, addEvent } = useContext(SharedEventContext);

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    const isValid = validateEventItem({
      title: trimmedInput,
      description: "New category added",
      date: "2025-10-26",
      location: "University of Manitoba",
    } as Partial<Event>);

    if (isValid && !categories.includes(trimmedInput)) {
      setCategories([...categories, trimmedInput]);
      setInput("");

      addEvent({
        id: allEvents.length + 1,
        title: trimmedInput + " Event",
        date: "2025-11-01",
        location: "Main Campus",
        description: "Auto-generated event from category",
      });
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const filteredCategories = EventService.sortByName(
    categories.filter((c) =>
      c.toLowerCase().includes(searchValue.toLowerCase())
    ),
    sortBy
  );

  return (
    <section className="event-categories">
      <h2>Event Categories</h2>

      <div className="controls">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search categories..."
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Sort: A–Z</option>
          <option value="desc">Sort: Z–A</option>
        </select>
      </div>

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

      {validationError && <p className="error">{validationError}</p>}

      <ul className="category-list">
        {filteredCategories.map((category, index) => (
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
