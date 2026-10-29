import { confirmReturnLoanService } from "../../services/loans/confirm-return-loan.service.js";
export async function confirmReturnLoanController(req, res, next) {
    try {
        const loanId = Number(req.params.id);
        if (isNaN(loanId)) {
            throw new Error("ID do empréstimo inválido");
        }
        const loan = await confirmReturnLoanService(loanId, req.userId);
        return res.status(200).json(loan);
    }
    catch (error) {
        next(error);
    }
}
