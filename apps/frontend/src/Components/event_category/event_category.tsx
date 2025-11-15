/**
 * event_category.tsx
 *
 * This component displays and manages event categories.
 * Users can search, sort, add, and remove categories dynamically.
 *
 * Features:
 * - Displays a list of categories directly from repository (categoryRepository).
 * - Allows adding and removing categories.
 */

import React, { useState, useContext } from "react";
import "./event_category.css";
import { useListControls } from "../hooks/useListControls";
import type { Event } from "../../types/event";
import { SharedEventContext } from "../../App";
import { categoryRepository } from "../../repositories/categoryRepository";
import type { Category } from "../../data/mockdataCategories";

function EventCategories() {
  const [categories, setCategories] = useState<Category[]>(categoryRepository.getAll());
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

    if (
      isValid &&
      !categories.some((c) => c.name.toLowerCase() === trimmedInput.toLowerCase())
    ) {
      const newCategory: Category = {
        id: categories.length + 1,
        name: trimmedInput,
        description: "User-added category",
      };

      categoryRepository.add(newCategory);

      setCategories(categoryRepository.getAll());
      setInput("");

      addEvent({
        id: allEvents.length + 1,
        title: `${trimmedInput} Event`,
        date: "2025-11-01",
        location: "Main Campus",
        description: "Auto-generated event from category",
      });
    }
  };

  const handleRemoveCategory = (id: number) => {
    categoryRepository.delete(id);
    setCategories(categoryRepository.getAll());
  };

  const filteredCategories = [...categories]
    .filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) =>
      sortBy === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
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
        {filteredCategories.map((category) => (
          <li key={category.id} className="category-item">
            <div>
              <strong>{category.name}</strong>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveCategory(category.id)}
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
