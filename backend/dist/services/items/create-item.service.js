import { prisma } from "../../config/prisma.js";
export async function createItemService({ name, category, description, ownerId, }) {
    const item = await prisma.item.create({
        data: {
            name,
            category,
            description,
            ownerId,
        },
    });
    return item;
}
