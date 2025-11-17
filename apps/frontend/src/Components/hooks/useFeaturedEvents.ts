import { useEffect, useState } from "react";
import type { FeaturedEventData } from "../../types/event";
import { featuredEventService } from "../services/featuredeventservice";

export function useFeaturedEvents() {
  const [items, setItems] = useState<FeaturedEventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await featuredEventService.listAll();
        setItems(all);
      } catch (err) {
        console.error("Failed to load featured events:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function addFeatured(e: Omit<FeaturedEventData, "id">) {
    try {
      const created = await featuredEventService.add(e);
      setItems(prev => [...prev, created]);
    } catch (err) {
      console.error("Failed to add featured event:", err);
    }
  }

  async function remove(id: string) {
    try {
      const ok = await featuredEventService.remove(id);
      if (ok) setItems(prev => prev.filter(x => x.id !== id));
    } catch (err) {
      console.error("Failed to remove featured event:", err);
    }
  }

  return { items, loading, addFeatured, remove };
}
