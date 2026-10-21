export type LoanStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "ACTIVE"
  | "RETURN_REQUESTED"
  | "RETURNED";

export interface Loan {
  id: number;
  itemId: number;
  ownerId: number;
  borrowerId: number;
  startDate: string;
  returnDate: string;
  status: LoanStatus;
  rating: number | null;
  createdAt: string;

  item: {
    id: number;
    name: string;
    category: string;
  };

  owner: {
    id: number;
    name: string;
  };

  borrower: {
    id: number;
    name: string;
  };
}