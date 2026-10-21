import { useAuth } from "../../../hooks/useAuth";
import type { Loan } from "../../../types/loan";
import "./loandCard.css";
import { CalendarDays, Check, X } from "lucide-react";
interface LoanCardProps {
  loan: Loan;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  onRequestReturn: (id: number) => void;
  onConfirmReturn: (id: number) => void;
  onRate: (id: number, rating: number) => void;
}

export function LoanCard({
  loan,
  onAccept,
  onReject,
  onRequestReturn,
  onConfirmReturn,
  onRate,
}: LoanCardProps) {
  const { user } = useAuth();

  return (
    <article className="loan-card">
      <div className="loan-card__header"><div><p className="eyebrow">{loan.item.category}</p><h2>{loan.item.name}</h2></div><span className="loan-card__status">{loan.status.replace("_", " ")}</span></div>
      <div className="loan-card__info"><div><span><CalendarDays size={13} /> Período</span><p>{new Date(loan.startDate).toLocaleDateString("pt-BR")} → {new Date(loan.returnDate).toLocaleDateString("pt-BR")}</p></div><div><span>Proprietário</span><p>{loan.owner.name}</p></div><div><span>Solicitante</span><p>{loan.borrower.name}</p></div></div>

      <div className="loan-card__actions">
        {loan.status === "PENDING" && user?.id === loan.ownerId && (
          <>
            <button
              className="loan-card__button"
              onClick={() => onAccept(loan.id)}
            >
              <Check size={16} /> Aceitar
            </button>

            <button
              className="loan-card__button loan-card__button--secondary"
              onClick={() => onReject(loan.id)}
            >
              <X size={16} /> Recusar
            </button>
          </>
        )}

        {loan.status === "ACCEPTED" && user?.id === loan.borrowerId && (
          <button
            className="loan-card__button"
            onClick={() => onRequestReturn(loan.id)}
          >
            Solicitar devolução
          </button>
        )}

        {loan.status === "RETURN_REQUESTED" && user?.id === loan.ownerId && (
          <button
            className="loan-card__button"
            onClick={() => onConfirmReturn(loan.id)}
          >
            Confirmar devolução
          </button>
        )}
      </div>

      {loan.status === "RETURNED" &&
        user?.id === loan.borrowerId &&
        loan.rating === null && (
          <div className="loan-card__rating">
            <p>Avalie este empréstimo:</p>

            <div className="loan-card__rating-buttons">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className="loan-card__rating-button"
                  onClick={() => onRate(loan.id, value)}
                >
                  {value} ⭐
                </button>
              ))}
            </div>
          </div>
        )}
    </article>
  );
}
