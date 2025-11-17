export type Category = {
  id: number;
  name: string;
  description: string;
};

const BASE_URL = "http://localhost:3000/api/v1/categories";

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, description })
    });

    if (!res.ok) {
      throw new Error("Failed to create category");
    }

    const body = await res.json();
    return body.data as Category;
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Failed to delete category");
    }
  }
};
