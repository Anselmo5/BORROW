import { AppError } from "../errors/app-error.js";
export function errorMiddleware(error, req, res, next) {
    console.error(error);
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
    return res.status(500).json({
        message: "Erro interno do servidor",
    });
}
