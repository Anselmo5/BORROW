import { prisma } from "../../config/prisma.js";

export async function listLoansService(userId: number) {
  const loans = await prisma.loan.findMany({
    where: {
      OR: [
        {
          borrowerId: userId,
        },
        {
          ownerId: userId,
        },
      ],
    },
    include: {
      item: true,
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
      borrower: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return loans;
}