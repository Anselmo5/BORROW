import { Request, Response } from "express";

export function meController(req: Request, res: Response) {
  return res.json({
    message: "Usuário autenticado!",
    userId: req.userId,
  });
}