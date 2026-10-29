import { rateLoanService } from "../../services/loans/rate-loan.service.js";
export async function rateLoanController(req, res, next) {
    try {
        const loanId = Number(req.params.id);
        const { rating } = req.body;
        if (isNaN(loanId)) {
            throw new Error("ID do empréstimo inválido");
        }
        const loan = await rateLoanService(loanId, req.userId, Number(rating));
        return res.status(200).json(loan);
    }
    catch (error) {
        next(error);
    }
}
