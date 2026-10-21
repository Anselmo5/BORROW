import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function registerService({
  name,
  email,
  password,
}: RegisterData) {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}