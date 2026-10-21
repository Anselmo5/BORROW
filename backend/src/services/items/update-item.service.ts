import { prisma } from "../../config/prisma.js";

interface UpdateItemData {
  id: number;
  ownerId: number;
  name?: string;
  category?: string;
  description?: string;
  available?: boolean;
}

export async function updateItemService({
  id,
  ownerId,
  name,
  category,
  description,
  available,
}: UpdateItemData) {
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