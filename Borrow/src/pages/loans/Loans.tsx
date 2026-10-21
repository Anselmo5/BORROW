import { useLoans } from "../../hooks/useLoans";
import { LoanCard } from "../../components/loans/loandCard/loandCard";
import { ErrorMessage } from "../../components/ui/ErrorMessage/ErrorMessage";
import { Loading } from "../../components/ui/loading/Loading";

export default function Loans() {
  const {
    loans,
    loading,
    error,
    acceptLoan,
    rejectLoan,
    requestReturn,
    confirmReturn,
    rateLoan,
    refetch,
  } = useLoans();

  if (loading) {
    return <Loading message="Carregando empréstimos..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (loans.length === 0) {
    return <div className="page"><div className="empty-state">Você ainda não possui empréstimos.</div></div>;
  }

  return (
    <main className="page"><header className="page-header"><div><p className="eyebrow">Acompanhe tudo</p><h1>Empréstimos</h1><p>Solicitações, itens ativos e devoluções em um só lugar.</p></div></header><div className="loan-list">
        {loans.map((loan) => (
          <LoanCard
            key={loan.id}
            loan={loan}
            onAccept={acceptLoan}
            onReject={rejectLoan}
            onRequestReturn={requestReturn}
            onConfirmReturn={confirmReturn}
            onRate={rateLoan}
          />
        ))}
      </div>
    </main>
  );
}
