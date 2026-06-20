const express = require("express");
const router = express.Router();

const agendamentoController = require("../controllers/agendamentoController");
const { verificarToken } = require("../middlewares/authMiddleware");

router.get("/", verificarToken, agendamentoController.listar);
router.get("/:id", verificarToken, agendamentoController.buscar);
router.post("/", verificarToken, agendamentoController.criar);
router.put("/:id", verificarToken, agendamentoController.atualizar);
router.patch("/:id/cancelar", verificarToken, agendamentoController.cancelar);
router.patch("/:id/finalizar", verificarToken, agendamentoController.finalizar);
router.delete("/:id", verificarToken, agendamentoController.excluir);

module.exports = router;