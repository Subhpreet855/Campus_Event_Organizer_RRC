const API_URL = import.meta.env.VITE_API_BASE_URL;

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

  async add(
    newEvent: { title: string; date: string; location: string; description: string },
    token: string | null
  ) {
    try {
      await fetch(`${API_URL}/eventsList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify(newEvent)
      });
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  },

  async delete(id: number, token: string | null) {
    try {
      await fetch(`${API_URL}/eventsList/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  }
};
