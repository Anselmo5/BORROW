import { listLoansService } from "../../services/loans/list-loans.service.js";
export async function listLoansController(req, res, next) {
    try {
        const loans = await listLoansService(req.userId);
        return res.status(200).json(loans);
    }
    catch (error) {
        next(error);
    }
}
