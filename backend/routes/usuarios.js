const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

router.get("/:id", usuariosController.buscarUsuario);

router.post("/", usuariosController.criarUsuario);

router.put("/:id", usuariosController.atualizarUsuario);

router.delete("/:id", usuariosController.deletarUsuario);

module.exports = router;