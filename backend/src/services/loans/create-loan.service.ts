import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/app-error.js";
interface CreateLoanData {
  itemId: number;
  borrowerId: number;
  startDate: Date;
  returnDate: Date;
}

export async function createLoanService({
  itemId,
  borrowerId,
  startDate,
  returnDate,
}: CreateLoanData) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    throw new AppError("Item não encontrado", 404);
  }

  if (!item.available) {
    throw new AppError("Item não está disponível", 400);
  }

  if (item.ownerId === borrowerId) {
    throw new AppError("Você não pode solicitar seu próprio item", 400);
  }

  if (isNaN(startDate.getTime()) || isNaN(returnDate.getTime())) {
    throw new AppError("Datas inválidas", 400);
  }

  if (returnDate <= startDate) {
    throw new AppError("A data de devolução deve ser posterior à data inicial", 400);
  }

  const existingLoan = await prisma.loan.findFirst({
    where: {
      itemId,
      status: {
        in: ["PENDING", "ACCEPTED", "RETURN_REQUESTED"],
      },
    },
  });

  if (existingLoan) {
    throw new AppError("Este item já possui uma solicitação ou empréstimo ativo", 409);
  }

  const loan = await prisma.loan.create({
    data: {
      itemId,
      ownerId: item.ownerId,
      borrowerId,
      startDate,
      returnDate,
    },
  });

  return loan;
}
