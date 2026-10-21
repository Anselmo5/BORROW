import { useItems } from "../../../hooks/useItems";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import { ItemCard } from "../../../components/items/ItemCard";
import { Loading } from "../../../components/ui/loading/Loading";
import { ErrorMessage } from "../../../components/ui/ErrorMessage/ErrorMessage";
export default function ExploreItems() {
  const { items, loading, error, refetch } = useItems();
  const [query, setQuery] = useState("");
  const filteredItems = items.filter((item) => `${item.name} ${item.category} ${item.description || ""}`.toLowerCase().includes(query.toLowerCase()));

  if (loading) {
    return <Loading message="Carregando itens..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <main className="page"><div className="page-header"><div><p className="eyebrow">Catálogo aberto</p><h1>Explorar itens</h1><p>Encontre algo útil perto de você.</p></div><Link className="button" to="/items/create">Adicionar item</Link></div>
      <div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome ou categoria" /></div>
      {filteredItems.length === 0 ? <div className="empty-state">Nenhum item encontrado.</div> : <div className="item-grid">{filteredItems.map((item) => <ItemCard item={item} key={item.id} />)}</div>}
    </main>
  );
}
