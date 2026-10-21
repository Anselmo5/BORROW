import { Request, Response } from "express";
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
    return res.status(401).json({
      message: error instanceof Error
        ? error.message
        : "Erro ao realizar login",
    });
  }
}