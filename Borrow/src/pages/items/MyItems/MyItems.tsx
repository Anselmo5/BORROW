import { Link } from "react-router-dom";
import { useItems } from "../../../hooks/useItems";
import { ItemCard } from "../../../components/items/ItemCard";
import { Loading } from "../../../components/ui/loading/Loading";
import { ErrorMessage } from "../../../components/ui/ErrorMessage/ErrorMessage";

export default function MyItems() {
  const { items, loading, error, refetch } = useItems(true);

  if (loading) {
    return <Loading message="Carregando seus itens..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <main className="page">
      <header className="page-header"><div><p className="eyebrow">Seu inventário</p><h1>Meus itens</h1><p>Cuide do que você escolheu compartilhar.</p></div><Link className="button" to="/items/create">Adicionar item</Link>
      </header>

      {items.length === 0 ? (
        <div className="empty-state">Você ainda não cadastrou nenhum item.</div>
      ) : (
        <div className="item-grid">{items.map((item) => <ItemCard item={item} showOwner={false} key={item.id} />)}</div>
      )}
    </main>
  );
}