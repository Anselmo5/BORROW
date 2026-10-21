import { Request, Response } from "express";
import { updateItemService } from "../../services/items/update-item.service.js";

export async function updateItemController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const { name, category, description, available } = req.body;

    const item = await updateItemService({
      id,
      ownerId: req.userId,
      name,
      category,
      description,
      available,
    });

    return res.status(200).json(item);
  } catch (error) {
    return res.status(404).json({
      message: error instanceof Error
        ? error.message
        : "Erro ao atualizar item",
    });
  }
}