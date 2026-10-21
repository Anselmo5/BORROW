import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/app-error.js";
export async function rateLoanService(
  loanId: number,
  userId: number,
  rating: number
) {
if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
  throw new AppError(
    "A avaliação deve ser entre 1 e 5",
    400
  );
}


  const loan = await prisma.loan.findUnique({
    where: {
      id: loanId,
    },
  });

  
if (!loan) {
  throw new AppError(
    "Empréstimo não encontrado",
    404
  );
}

if (loan.ownerId !== userId && loan.borrowerId !== userId) {
  throw new AppError(
    "Você não participa deste empréstimo",
    403
  );
}

if (loan.status !== "RETURNED") {
  throw new AppError(
    "A avaliação só pode ser feita após a devolução",
    409
  );
}

if (loan.rating !== null) {
  throw new AppError(
    "Este empréstimo já foi avaliado",
    409
  );
}

  const updatedLoan = await prisma.loan.update({
    where: {
      id: loanId,
    },
    data: {
      rating,
    },
  });

  return updatedLoan;
}