var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/jogos", function (req, res) {
    usuarioController.pegarJogos(req, res);
});

router.post("/verificar", function (req, res) {
    usuarioController.verificar(req, res);
});

router.post("/porcentagem", function (req, res) {
    usuarioController.porcentagem(req, res);
});

module.exports = router;