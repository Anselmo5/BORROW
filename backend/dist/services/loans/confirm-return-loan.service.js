import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/app-error.js";
export async function confirmReturnLoanService(loanId, ownerId) {
    const loan = await prisma.loan.findUnique({
        where: {
            id: loanId,
        },
    });
    if (!loan) {
        throw new AppError("Empréstimo não encontrado", 404);
    }
    if (loan.ownerId !== ownerId) {
        throw new AppError("Você não é o dono deste item", 403);
    }
    if (loan.status !== "RETURN_REQUESTED") {
        throw new AppError("A devolução ainda não foi solicitada", 409);
    }
    const returnedLoan = await prisma.$transaction(async (transaction) => {
        const updatedLoan = await transaction.loan.update({
            where: {
                id: loanId,
            },
            data: {
                status: "RETURNED",
            },
        });
        await transaction.item.update({
            where: {
                id: loan.itemId,
            },
            data: {
                available: true,
            },
        });
        return updatedLoan;
    });
    return returnedLoan;
}
