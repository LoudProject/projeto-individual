var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função VerPontosUsuario quizController.js
router.post("/criarQuiz", function (req, res) {
    quizController.criarQuiz(req, res);
});


router.post("/InserirValoresQuiz", function (req, res) {
    quizController.InserirValoresQuiz(req, res);
});

router.post("/VerPontosUsuario", function (req, res) {
    quizController.VerPontosUsuario(req, res);
})

router.post("/qtdAcertosPorQuestao", function (req, res) {
    quizController.qtdAcertosPorQuestao(req, res);
});



module.exports = router;