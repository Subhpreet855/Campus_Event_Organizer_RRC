
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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function addFeatured(e: Omit<FeaturedEventData, "id">) {
    const created = await featuredEventService.add(e);
    setItems(prev => [...prev, created]);
  }

  async function remove(id: string) {
    const ok = await featuredEventService.remove(id);
    if (ok) setItems(prev => prev.filter(x => x.id !== id));
  }

  return { items, loading, addFeatured, remove };
}
