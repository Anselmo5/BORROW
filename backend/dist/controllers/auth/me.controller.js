export function meController(req, res) {
    return res.json({
        message: "Usuário autenticado!",
        userId: req.userId,
    });
}
