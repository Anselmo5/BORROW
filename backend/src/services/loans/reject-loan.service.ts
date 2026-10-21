import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/app-error.js";
export async function rejectLoanService(
  loanId: number,
  ownerId: number
) {
  const loan = await prisma.loan.findUnique({
    where: {
      id: loanId,
    },
  });

if (!loan) {
  throw new AppError("Empréstimo não encontrado", 404);
}

if (loan.ownerId !== ownerId) {
  throw new AppError(
    "Você não é o dono deste item",
    403
  );
}

if (loan.status !== "PENDING") {
  throw new AppError(
    "Este empréstimo não está pendente",
    409
  );
}

  const rejectedLoan = await prisma.loan.update({
    where: {
      id: loanId,
    },
    data: {
      status: "REJECTED",
    },
  });

  return rejectedLoan;
}