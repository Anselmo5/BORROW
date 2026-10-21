import { Request, Response } from "express";
import { createItemService } from "../../services/items/create-item.service.js";

export async function createItemController(
  req: Request,
  res: Response
) {
  try {
    const { name, category, description } = req.body;

    const item = await createItemService({
      name,
      category,
      description,
      ownerId: req.userId,
    });

    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao cadastrar item",
    });
  }
}