import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/app-error.js";
export async function acceptLoanService(
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


  const item = await prisma.item.findUnique({
    where: {
      id: loan.itemId,
    },
  });

 if (!item?.available) {
  throw new AppError(
    "Item não está disponível",
    409
  );
}
  const acceptedLoan = await prisma.$transaction(async (transaction) => {
    const updatedLoan = await transaction.loan.update({
      where: {
        id: loanId,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    await transaction.item.update({
      where: {
        id: loan.itemId,
      },
      data: {
        available: false,
      },
    });

    return updatedLoan;
  });

  return acceptedLoan;
}