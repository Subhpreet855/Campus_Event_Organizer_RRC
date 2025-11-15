import { useState } from "react";
import type { Event } from "../../types/event";
 
export function useListControls() {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [validationError, setValidationError] = useState<string>("");
 
  const validateEventItem = (item: Partial<Event>): boolean => {
    if (!item.title || item.title.trim().length < 3) {
      setValidationError("Title must be at least 3 characters long.");
      return false;
    }
    setValidationError("");
    return true;
  };
 
  return {
    searchValue,
    setSearchValue,
    sortBy,
    setSortBy,
    validateEventItem,
    validationError,
  };
}