import { listItemsService } from "../../services/items/list-items.service.js";
import { listMyItemsService } from "../../services/items/list-my-items.service.js";
export async function listItemsController(req, res) {
    try {
        const items = await listItemsService(req.userId);
        return res.status(200).json(items);
    }
    catch {
        return res.status(500).json({
            message: "Erro ao listar itens",
        });
    }
}
export async function listMyItemsController(req, res) {
    try {
        const items = await listMyItemsService(req.userId);
        return res.status(200).json(items);
    }
    catch {
        return res.status(500).json({
            message: "Erro ao listar meus itens",
        });
    }
}
