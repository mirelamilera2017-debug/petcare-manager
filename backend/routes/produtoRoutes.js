const express = require("express");
const router = express.Router();

const produtoController = require("../controllers/produtoController");
const { verificarToken } = require("../middlewares/authMiddleware");

router.get("/", verificarToken, produtoController.listar);

router.get("/:id", verificarToken, produtoController.buscar);

router.post("/", verificarToken, produtoController.criar);

router.put("/:id", verificarToken, produtoController.atualizar);

router.delete("/:id", verificarToken, produtoController.excluir);

module.exports = router;