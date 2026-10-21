import { Request, Response, NextFunction } from "express";
import { rejectLoanService } from "../../services/loans/reject-loan.service.js";

export async function rejectLoanController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loanId = Number(req.params.id);

    if (isNaN(loanId)) {
      throw new Error("ID do empréstimo inválido");
    }

    const loan = await rejectLoanService(
      loanId,
      req.userId
    );

    return res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
}