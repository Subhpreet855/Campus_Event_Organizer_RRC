import { useEffect, useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import {
  categoryRepository,
  type Category,
} from "../../repositories/categoryRepository";

export const useCategoryHook = () => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingPrefs, setLoadingPrefs] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      setError(null);
      const data = await categoryRepository.getAll();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadPreferences = async () => {
    if (!isSignedIn) {
      setSelectedCategoryIds([]);
      return;
    }

    try {
      setLoadingPrefs(true);
      setError(null);

      const token = await getToken();
      if (!token) throw new Error("No token");

      const prefs = await categoryRepository.getUserPreferences(token);
      setSelectedCategoryIds(prefs);
    } catch (err) {
      console.error(err);
      setError("Failed to load your category preferences");
    } finally {
      setLoadingPrefs(false);
    }
  };

  const addCategory = async (name: string, description?: string) => {
    try {
      const newCategory = await categoryRepository.add(name, description);
      setCategories((prev) => [...prev, newCategory]);
    } catch (err) {
      console.error(err);
      setError("Failed to add category");
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoryRepository.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete category");
    }
  };

  const toggleCategory = useCallback((id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const savePreferences = useCallback(async () => {
    if (!isSignedIn) return;

    try {
      setSavingPrefs(true);
      setError(null);

      const token = await getToken();
      if (!token) throw new Error("No token");

      await categoryRepository.updateUserPreferences(
        selectedCategoryIds,
        token
      );
    } catch (err) {
      console.error(err);
      setError("Failed to save your category preferences");
    } finally {
      setSavingPrefs(false);
    }
  }, [isSignedIn, getToken, selectedCategoryIds]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadPreferences();
  }, [isSignedIn]);

  return {
    categories,
    selectedCategoryIds,
    loadingCategories,
    loadingPrefs,
    savingPrefs,
    error,
    isSignedIn,
    addCategory,
    deleteCategory,
    toggleCategory,
    savePreferences,
    reload: loadCategories,
  };
};
