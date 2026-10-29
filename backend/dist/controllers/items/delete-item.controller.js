import { deleteItemService } from "../../services/items/delete-item.service.js";
export async function deleteItemController(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID inválido",
            });
        }
        await deleteItemService(id, req.userId);
        return res.status(204).send();
    }
    catch (error) {
        return res.status(404).json({
            message: error instanceof Error
                ? error.message
                : "Erro ao excluir item",
        });
    }
}
