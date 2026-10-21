import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/app-error.js";
export async function requestReturnLoanService(
  loanId: number,
  borrowerId: number
) {
  const loan = await prisma.loan.findUnique({
    where: {
      id: loanId,
    },
  });

if (!loan) {
  throw new AppError("Empréstimo não encontrado", 404);
}

if (loan.borrowerId !== borrowerId) {
  throw new AppError(
    "Você não solicitou este empréstimo",
    403
  );
}

if (loan.status !== "ACCEPTED") {
  throw new AppError(
    "Este empréstimo não pode ser devolvido agora",
    409
  );
}

  const updatedLoan = await prisma.loan.update({
    where: {
      id: loanId,
    },
    data: {
      status: "RETURN_REQUESTED",
    },
  });

  return updatedLoan;
}