import { registerService } from "../../services/auth/register.service.js";
export async function registerController(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await registerService({
            name,
            email,
            password,
        });
        return res.status(201).json(user);
    }
    catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(400).json({
            message: error instanceof Error
                ? error.message
                : "Erro ao cadastrar usuário",
        });
    }
}
