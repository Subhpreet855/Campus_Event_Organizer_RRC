/**
 * event_category.tsx
 *
 * This component displays and manages event categories.
 * Users can search, sort, add, and remove categories dynamically.
 *
 * Features:
 * - Loads categories from the back-end via categoryRepository.
 * - Allows adding and removing categories with persistence in the database.
 */

import React, { useState, useContext, useEffect } from "react";
import "./event_category.css";
import { useListControls } from "../hooks/useListControls";
import type { Event } from "../../types/event";
import { SharedEventContext } from "../../App";
import { categoryRepository, type Category } from "../../repositories/categoryRepository";

function EventCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const {
    searchValue,
    setSearchValue,
    sortBy,
    setSortBy,
    validateEventItem,
    validationError,
  } = useListControls();

  const { allEvents, addEvent } = useContext(SharedEventContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryRepository.getAll();
        setCategories(data);
      } catch (error) {
        console.error(error);
        setLoadError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    const isValid = validateEventItem({
      title: trimmedInput,
      description: "New category added",
      date: "2025-10-26",
      location: "University of Manitoba",
    } as Partial<Event>);

    if (
      !isValid ||
      !trimmedInput ||
      categories.some(
        (c) => c.name.toLowerCase() === trimmedInput.toLowerCase()
      )
    ) {
      return;
    }

    try {
      const newCategory = await categoryRepository.add(
        trimmedInput,
        "User-added category"
      );
  
      setCategories((prev) => [...prev, newCategory]);
      setInput("");

      addEvent({
        id: allEvents.length + 1,
        title: `${trimmedInput} Event`,
        date: "2025-11-01",
        location: "Main Campus",
        description: "Auto-generated event from category",
      });
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  const handleRemoveCategory = async (id: number) => {
    try {
      await categoryRepository.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const filteredCategories = [...categories]
    .filter((c) =>
      c.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <section className="event-categories">
      <h2>Event Categories</h2>

      {loading && <p>Loading categories...</p>}
      {loadError && <p className="error">{loadError}</p>}

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
