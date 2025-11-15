import { useState } from "react";

export function useEventForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");
  };

  return {
    title,
    date,
    location,
    description,
    setTitle,
    setDate,
    setLocation,
    setDescription,
    resetForm,
  };
}
