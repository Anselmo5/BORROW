import { prisma } from "../../config/prisma.js";

interface CreateItemData {
  name: string;
  category: string;
  description?: string;
  ownerId: number;
}

export async function createItemService({
  name,
  category,
  description,
  ownerId,
}: CreateItemData) {
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