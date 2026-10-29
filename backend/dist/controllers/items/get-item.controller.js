import { getItemService } from "../../services/items/get-item.service.js";
export async function getItemController(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID inválido",
            });
        }
        const item = await getItemService(id);
        return res.status(200).json(item);
    }
    catch (error) {
        return res.status(404).json({
            message: error instanceof Error
                ? error.message
                : "Item não encontrado",
        });
    }
}
