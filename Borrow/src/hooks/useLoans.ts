import { useCallback, useEffect, useState } from "react";
import {
  acceptLoanService,
  confirmReturnLoanService,
  listLoansService,
  rateLoanService,
  rejectLoanService,
  requestReturnLoanService,
} from "../services/loans";
import type { Loan } from "../types/loan";

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await listLoansService();

      setLoans(data);
    } catch {
      setError("Não foi possível carregar os empréstimos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  async function acceptLoan(id: number) {
    await acceptLoanService(id);
    await fetchLoans();
  }

  async function rejectLoan(id: number) {
    await rejectLoanService(id);
    await fetchLoans();
  }

  async function requestReturn(id: number) {
    await requestReturnLoanService(id);
    await fetchLoans();
  }

  async function confirmReturn(id: number) {
    await confirmReturnLoanService(id);
    await fetchLoans();
  }

  async function rateLoan(id: number, rating: number) {
    await rateLoanService(id, rating);
    await fetchLoans();
  }

  return {
    loans,
    loading,
    error,
    refetch: fetchLoans,
    acceptLoan,
    rejectLoan,
    requestReturn,
    confirmReturn,
    rateLoan,
  };
}
