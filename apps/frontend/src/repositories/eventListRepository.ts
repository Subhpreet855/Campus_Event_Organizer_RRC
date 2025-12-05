const API_URL = import.meta.env.NEXT_PUBLIC_API_URL;

export const eventListRepository = {
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/eventsList`);
      const result = await response.json();
      return result.data ?? [];
    } catch (error) {
      console.error("Failed to load events:", error);
      return [];
    }
  },

  async add(newEvent: { title: string; date: string; location: string; description: string }) {
    try {
      await fetch(`${API_URL}/eventsList`, {
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
      await fetch(`${API_URL}/eventsList/${id}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  }
};
