import { Request, Response } from "express";
import { AppError } from "../../errors/app-error.js";
import { loginService } from "../../services/auth/login.service.js";

export async function loginController(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const result = await loginService({
      email,
      password,
    });

    return res.status(200).json(result);
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error("Erro ao realizar login:", error);
      return res.status(500).json({
        message: "Erro interno ao realizar login",
      });
    }

    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
}