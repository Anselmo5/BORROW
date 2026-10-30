import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/app-error.js";
export async function loginService({ email, password, }) {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new AppError("Email ou senha inválidos", 401);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new AppError("Email ou senha inválidos", 401);
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
}
