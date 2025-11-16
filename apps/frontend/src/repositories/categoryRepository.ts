import { mockCategories } from "../data/mockdataCategories"; 
import type { Category } from "../data/mockdataCategories"; 
 
let categoryData: Category[] = [...mockCategories]; 

export const categoryRepository = {
  getAll(): Category[] {
    return categoryData;
  },
 
  add(newCategory: Category): void {
    const exists = categoryData.find(
      (c) => c.name.toLowerCase() === newCategory.name.toLowerCase()
    );

    if (!exists) {
      categoryData.push(newCategory);
    }
  },
 
  delete(id: number): void {
    categoryData = categoryData.filter((c) => c.id !== id);
  },
};

 