import { prisma } from "../../config/prisma.js";
export async function deleteItemService(id, ownerId) {
    const item = await prisma.item.findFirst({
        where: {
            id,
            ownerId,
        },
    });
    if (!item) {
        throw new Error("Item não encontrado");
    }
    await prisma.item.delete({
        where: { id },
    });
}
