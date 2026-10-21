import { Request, Response, NextFunction } from "express";
import { requestReturnLoanService } from "../../services/loans/request-return-loan.service.js";

export async function requestReturnLoanController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loanId = Number(req.params.id);

    if (isNaN(loanId)) {
      throw new Error("ID do empréstimo inválido");
    }

    const loan = await requestReturnLoanService(
      loanId,
      req.userId
    );

    return res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
}