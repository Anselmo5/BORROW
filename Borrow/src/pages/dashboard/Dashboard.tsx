import { useAuth } from "../../hooks/useAuth";
import { useItems } from "../../hooks/useItems";
import { useLoans } from "../../hooks/useLoans";
import { Link } from "react-router-dom";
import { Loading } from "../../components/ui/loading/Loading";
import { ErrorMessage } from "../../components/ui/ErrorMessage/ErrorMessage";
import { LoanCard } from "../../components/loans/loandCard/loandCard";

export default function Dashboard() {
  const { user } = useAuth();
  const { items, loading: itemsLoading, error: itemsError, refetch: refetchItems } = useItems();
  const { loans, loading: loansLoading } = useLoans();

  const pendingLoans = loans.filter(
    (loan) => loan.status === "PENDING"
  );

  const activeLoans = loans.filter(
    (loan) => loan.status === "ACCEPTED"
  );

  const availableItems = items.filter(
    (item) => item.available
  );

  const loading = itemsLoading || loansLoading;

  if (loading) return <Loading message="Carregando dashboard..." />;
  if (itemsError) return <ErrorMessage message={itemsError} onRetry={refetchItems} />;

  return (
    <main className="page">
      <header className="dashboard-hero">
        <p className="eyebrow">Olá, {user?.name}</p>
        <h1>Seu espaço no BORROW.</h1>
        <p>Compartilhe mais. Tenha acesso ao que precisa.</p>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <span>Itens disponíveis</span>
          <strong>{availableItems.length}</strong>
        </article>

        <article className="summary-card">
          <span>Empréstimos ativos</span>
          <strong>{activeLoans.length}</strong>
        </article>

        <article className="summary-card">
          <span>Solicitações pendentes</span>
          <strong>{pendingLoans.length}</strong>
        </article>
      </section>

      <section>
        <div className="page-header"><div><h2 className="section-title">Seus empréstimos</h2><p className="muted">Acompanhe suas movimentações recentes.</p></div><Link className="button button--secondary" to="/loans">Ver todos</Link></div>

        {loans.length === 0 ? (
          <div className="empty-state">Você ainda não possui empréstimos.</div>
        ) : (
          <div className="loan-list">{loans.slice(0, 3).map((loan) => <LoanCard key={loan.id} loan={loan} onAccept={() => undefined} onReject={() => undefined} onRequestReturn={() => undefined} onConfirmReturn={() => undefined} onRate={() => undefined} />)}</div>
        )}
      </section>
    </main>
  );
}