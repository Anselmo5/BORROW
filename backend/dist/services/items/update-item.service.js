import { prisma } from "../../config/prisma.js";
export async function updateItemService({ id, ownerId, name, category, description, available, }) {
    const item = await prisma.item.findFirst({
        where: {
            id,
            ownerId,
        },
    });
    if (!item) {
        throw new Error("Item não encontrado");
    }
    return prisma.item.update({
        where: { id },
        data: {
            name,
            category,
            description,
            available,
        },
    });
}
