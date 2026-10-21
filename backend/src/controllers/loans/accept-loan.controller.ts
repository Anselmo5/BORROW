import { Request, Response, NextFunction } from "express";
import { acceptLoanService } from "../../services/loans/accept-loan.service.js";

export async function acceptLoanController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loanId = Number(req.params.id);

    if (isNaN(loanId)) {
      throw new Error("ID do empréstimo inválido");
    }

    const loan = await acceptLoanService(
      loanId,
      req.userId
    );

    return res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
}