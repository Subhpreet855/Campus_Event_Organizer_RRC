const BASE_URL = "http://localhost:3000/api/v1/eventslist";

export const eventListRepository = {
  async getAll() {
    try {
      const response = await fetch(BASE_URL);
      const result = await response.json();
      return result.data ?? [];
    } catch (error) {
      console.error("Failed to load events:", error);
      return [];
    }
  },

  async add(newEvent: { title: string; date: string; location: string; description: string }) {
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  },

  async delete(id: number) {
    try {
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  }
};
