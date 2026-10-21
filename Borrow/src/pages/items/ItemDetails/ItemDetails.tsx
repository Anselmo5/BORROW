import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemService } from "../../../services/items";
import type { Item } from "../../../types/item";
import { createLoanService } from "../../../services/loans";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Loading } from "../../../components/ui/loading/Loading";
import { ErrorMessage } from "../../../components/ui/ErrorMessage/ErrorMessage";

export default function ItemDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loadingLoan, setLoadingLoan] = useState(false);
  const [loanError, setLoanError] = useState<string | null>(null);
  const [loanSuccess, setLoanSuccess] = useState(false);

  useEffect(() => {
    async function loadItem() {
      if (!id) return;

      try {
        setLoading(true);

        const data = await getItemService(Number(id));

        setItem(data);
      } catch {
        setError("Não foi possível carregar o item.");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) {
    return <Loading message="Carregando item..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!item) {
    return <p>Item não encontrado.</p>;
  }

  async function handleCreateLoan(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!item) return;

    try {
      setLoadingLoan(true);
      setLoanError(null);
      setLoanSuccess(false);

      await createLoanService({
        itemId: item.id,
        startDate,
        returnDate,
      });

      setLoanSuccess(true);
    } catch {
      setLoanError("Não foi possível solicitar o empréstimo.");
    } finally {
      setLoadingLoan(false);
    }
  }
  return (
    <main className="page"><div className="detail-layout"><section className="detail-panel"><Link className="back-link" to="/items">← Explorar itens</Link><p className="eyebrow">{item.category}</p><h1>{item.name}</h1><p className="detail-panel__description">{item.description || "Este item ainda não possui uma descrição."}</p><div className="detail-meta"><div><span>Proprietário</span><strong>{item.owner?.name || "Comunidade BORROW"}</strong></div><div><span>Disponibilidade</span><strong>{item.available ? "Disponível para empréstimo" : "Indisponível"}</strong></div></div></section>

      {item.ownerId !== user?.id && item.available && (<form className="detail-panel form-stack" onSubmit={handleCreateLoan}><div><h2>Solicitar empréstimo</h2><p className="muted">Escolha o período em que você precisa do item.</p></div><div className="form-field">
            <label htmlFor="startDate">Data de início</label>

            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="returnDate">Data de devolução</label>

            <input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
              required
            />
          </div>

          {loanError && <ErrorMessage message={loanError} />}
          {loanSuccess && <p className="inline-success">Solicitação de empréstimo enviada!</p>}

          <button className="button" type="submit" disabled={loadingLoan}>{loadingLoan ? "Enviando..." : "Solicitar empréstimo"}</button>
        </form>)}
      {item.ownerId === user?.id && <div className="detail-panel"><p className="muted">Este item pertence a você.</p></div>}
      {item.ownerId !== user?.id && !item.available && <div className="detail-panel"><p className="muted">Este item não está disponível no momento.</p></div>}
      </div>
    </main>
  );
}
