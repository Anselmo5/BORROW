import { Request, Response, NextFunction } from "express";
import { createLoanService } from "../../services/loans/create-loan.service.js";

export async function createLoanController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { itemId, startDate, returnDate } = req.body;

    const loan = await createLoanService({
      itemId: Number(itemId),
      borrowerId: req.userId,
      startDate: new Date(startDate),
      returnDate: new Date(returnDate),
    });

    return res.status(201).json(loan);
  } catch (error) {
    next(error);
  }
}