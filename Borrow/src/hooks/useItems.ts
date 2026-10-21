import { useCallback, useEffect, useState } from "react";
import { listItemsService, listMyItemsService } from "../services/items";
import type { Item } from "../types/item";

export function useItems(myItems = false) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await (myItems ? listMyItemsService() : listItemsService());

      setItems(data);
    } catch {
      setError("Não foi possível carregar os itens.");
    } finally {
      setLoading(false);
    }
  }, [myItems]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
  };
}