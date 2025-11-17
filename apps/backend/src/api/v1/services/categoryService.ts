import prisma from "../../../prismaClient";

export type Category = {
  id: number;
  name: string;
  description: string;
};

export const getCategoryById = async (
  id: number
): Promise<Category | null> => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    return null;
  } else {
    return category as Category;
  }
};

export const createCategory = async (
  data: { name: string; description?: string }
): Promise<Category> => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingCategory) {
    throw new Error(`Category with name "${data.name}" already exists`);
  }

  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
      description: data.description || "No description",
    },
  });

  return newCategory as Category;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany();
  return categories as Category[];
};

export const updateCategory = async (
  id: number,
  data: { name?: string; description?: string }
): Promise<Category> => {
  if (data.name) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: data.name,
        NOT: { id }, 
      },
    });

    if (existingCategory) {
      throw new Error(`Category with name "${data.name}" already exists`);
    }
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
    },
  });

  return updatedCategory as Category;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await prisma.category.delete({
    where: { id },
  });
};
