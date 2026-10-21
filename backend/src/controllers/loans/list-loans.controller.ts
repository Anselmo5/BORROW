import { Request, Response, NextFunction } from "express";
import { listLoansService } from "../../services/loans/list-loans.service.js";

export async function listLoansController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loans = await listLoansService(req.userId);

    return res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
}