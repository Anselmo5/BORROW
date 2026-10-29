import { prisma } from "../../config/prisma.js";
export async function getItemService(id) {
    const item = await prisma.item.findUnique({
        where: { id },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!item) {
        throw new Error("Item não encontrado");
    }
    return item;
}
