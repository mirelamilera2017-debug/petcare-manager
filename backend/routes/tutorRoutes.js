const express = require("express");
const router = express.Router();

const tutorController = require("../controllers/tutorController");
const { verificarToken } = require("../middlewares/authMiddleware");

// Listar todos os tutores
router.get("/", verificarToken, tutorController.listar);

// Buscar tutor por ID
router.get("/:id", verificarToken, tutorController.buscar);

// Cadastrar tutor
router.post("/", verificarToken, tutorController.criar);

// Atualizar tutor
router.put("/:id", verificarToken, tutorController.atualizar);

// Excluir tutor
router.delete("/:id", verificarToken, tutorController.excluir);

module.exports = router;