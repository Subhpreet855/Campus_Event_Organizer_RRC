export type Category = {
  id: number;
  name: string;
  description: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";

const BASE_URL = `${API_BASE_URL}/categories`;

export const categoryRepository = {
  async getAll(): Promise<Category[]> {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const body = await res.json();
    return body.data as Category[];
  },

  async add(name: string, description?: string): Promise<Category> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    if (!res.ok) {
      throw new Error("Failed to create category");
    }

    const body = await res.json();
    return body.data as Category;
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete category");
    }
  },

  // 🔐 NEW – get logged-in user's saved category IDs
  async getUserPreferences(token: string): Promise<number[]> {
    const res = await fetch(`${BASE_URL}/preferences`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user category preferences");
    }

    const body = await res.json();
    // backend successResponse(data, message)
    return body.data as number[];
  },

  // 🔐 NEW – update logged-in user's saved category IDs
  async updateUserPreferences(
    categories: number[],
    token: string
  ): Promise<number[]> {
    const res = await fetch(`${BASE_URL}/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categories }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user category preferences");
    }

    const body = await res.json();
    return body.data as number[];
  },
};
