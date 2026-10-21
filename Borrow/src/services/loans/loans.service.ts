import { api } from "../api";

interface CreateLoanData {
  itemId: number;
  startDate: string;
  returnDate: string;
}

export async function createLoanService(data: CreateLoanData) {
  const response = await api.post("/loans", data);

  return response.data;
}

export async function listLoansService() {
  const response = await api.get("/loans");

  return response.data;
}



export async function acceptLoanService(id: number) {
  const response = await api.post(`/loans/${id}/accept`);

  return response.data;
}

export async function rejectLoanService(id: number) {
  const response = await api.post(`/loans/${id}/reject`);

  return response.data;
}

export async function requestReturnLoanService(id: number) {
  const response = await api.post(`/loans/${id}/request-return`);

  return response.data;
}

export async function confirmReturnLoanService(id: number) {
  const response = await api.post(`/loans/${id}/confirm-return`);

  return response.data;
}

export async function rateLoanService(id: number, rating: number) {
  const response = await api.post(`/loans/${id}/rate`, {
    rating,
  });

  return response.data;
}