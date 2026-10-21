import { prisma } from "../../config/prisma.js";

export async function listItemsService(userId: number) {
const items = await prisma.item.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return items;
}