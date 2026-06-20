const jwt = require("jsonwebtoken");

const SECRET = "petcare_manager_secret";

// Middleware responsável por proteger rotas privadas com JWT - [Mirela Santos]
function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não informado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const usuario = jwt.verify(token, SECRET);
        req.usuario = usuario;
        next();
    } catch (erro) {
        return res.status(401).json({ mensagem: "Token inválido ou expirado" });
    }
}

module.exports = { verificarToken, SECRET };