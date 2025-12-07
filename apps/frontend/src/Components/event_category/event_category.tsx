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
import {
  categoryRepository,
  type Category,
} from "../../repositories/categoryRepository";
import { useUser, useAuth } from "@clerk/clerk-react";

function EventCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // NEW: user-specific preferences state
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loadingPrefs, setLoadingPrefs] = useState<boolean>(false);
  const [savingPrefs, setSavingPrefs] = useState<boolean>(false);
  const [prefsError, setPrefsError] = useState<string | null>(null);

  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

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

  // NEW: load logged-in user's saved category preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!isSignedIn) {
        setSelectedCategoryIds([]);
        return;
      }

      try {
        setLoadingPrefs(true);
        setPrefsError(null);

        const token = await getToken();
        if (!token) throw new Error("No token");

        const prefs = await categoryRepository.getUserPreferences(token);
        setSelectedCategoryIds(prefs);
      } catch (error) {
        console.error(error);
        setPrefsError("Failed to load your saved category preferences");
      } finally {
        setLoadingPrefs(false);
      }
    };

    fetchPreferences();
  }, [isSignedIn, getToken]);

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
      // Also remove from preferences if present
      setSelectedCategoryIds((prev) => prev.filter((x) => x !== id));
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  // NEW: toggle preference for a category ID
  const toggleCategoryPreference = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // NEW: save preferences to backend with Clerk token
  const handleSavePreferences = async () => {
    if (!isSignedIn) return;

    try {
      setSavingPrefs(true);
      setPrefsError(null);

      const token = await getToken();
      if (!token) throw new Error("No token");

      await categoryRepository.updateUserPreferences(
        selectedCategoryIds,
        token
      );
    } catch (error) {
      console.error(error);
      setPrefsError("Failed to save your category preferences");
    } finally {
      setSavingPrefs(false);
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
      {loadingPrefs && isSignedIn && <p>Loading your saved preferences...</p>}
      {loadError && <p className="error">{loadError}</p>}
      {prefsError && <p className="error">{prefsError}</p>}

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
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategoryIds.includes(category.id)}
                  disabled={!isSignedIn}
                  onChange={() => toggleCategoryPreference(category.id)}
                  style={{ marginRight: "0.5rem" }}
                />
                <strong>{category.name}</strong>
              </label>
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

      {!isSignedIn && (
        <p className="hint">
          Log in to save your favourite categories to your account.
        </p>
      )}

      {isSignedIn && (
        <button
          type="button"
          onClick={handleSavePreferences}
          disabled={savingPrefs}
          className="save-preferences-btn"
        >
          {savingPrefs ? "Saving..." : "Save My Category Preferences"}
        </button>
      )}
    </section>
  );
}

export default EventCategories;
