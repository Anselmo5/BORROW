import { Request, Response } from "express";
import { registerService } from "../../services/auth/register.service.js";

export async function registerController(
  req: Request,
  res: Response
) {
  try {
    const { name, email, password } = req.body;

    const user = await registerService({
      name,
      email,
      password,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error
        ? error.message
        : "Erro ao cadastrar usuário",
    });
  } 
} 
