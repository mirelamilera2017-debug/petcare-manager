const express = require("express");
const router = express.Router();

const servicoController = require("../controllers/servicoController");
const { verificarToken } = require("../middlewares/authMiddleware");

router.get("/", verificarToken, servicoController.listar);
router.get("/:id", verificarToken, servicoController.buscar);
router.post("/", verificarToken, servicoController.criar);
router.put("/:id", verificarToken, servicoController.atualizar);
router.delete("/:id", verificarToken, servicoController.excluir);

module.exports = router;