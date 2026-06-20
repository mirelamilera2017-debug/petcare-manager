const express = require("express");
const router = express.Router();

const petController = require("../controllers/petController");
const { verificarToken } = require("../middlewares/authMiddleware");

router.get("/", verificarToken, petController.listar);
router.get("/:id", verificarToken, petController.buscar);
router.post("/", verificarToken, petController.criar);
router.put("/:id", verificarToken, petController.atualizar);
router.delete("/:id", verificarToken, petController.excluir);

module.exports = router;