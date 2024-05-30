var quizModel = require("../models/quizModel");

function criarQuiz(req, res) {
    var idQuiz = req.body.idQuizServer;
    var fkUsuario = req.body.fkUsuarioServer;


    if (idQuiz == undefined) {
        res.status(400).send("Seu idQuiz está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    }  else {

        quizModel.criarQuiz( idQuiz, fkUsuario)
            .then(
                function (resultadoCriarQuiz) {
                    console.log(`\nResultados encontrados: ${resultadoCriarQuiz.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoCriarQuiz)}`); // transforma JSON em String

                    if (resultadoCriarQuiz.length == 1) {
                        console.log(resultadoCriarQuiz);

                       
                                    res.json({
                                        idQuiz: resultadoCriarQuiz[0].idQuiz,
                                        fkUsuario: resultadoCriarQuiz[0].fkUsuario
                                                                             
                                    });
                                
                            

                    } else if (resultadoCriarQuiz.length == 0) {
                        res.status(403).send("idQuiz inválido");
                    } else {
                        res.status(403).send("SEI LÁ fkUsuario");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o idQuiz Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function InserirValoresQuiz(req, res) {
    var idQuestao = req.body.idQuestaoServer;
    var acertos = req.body.acertosServer;
    var fkQuiz = req.body.fkQuizServer;

    if (idQuestao == undefined) {
        res.status(400).send("Seu quiz está undefined!");
    } else if (acertos == undefined) {
        res.status(400).send("Seus acertos está undefined!");
    } else if (fkQuiz == undefined) {
        res.status(400).send("Seu fkQuiz está undefined!");
    }  else {

        quizModel.InserirValoresQuiz( idQuestao, acertos, fkQuiz)
            .then(
                function (resultadoInserirQuiz) {
                    console.log(`\nResultados encontrados: ${resultadoInserirQuiz.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoInserirQuiz)}`); // transforma JSON em String

                    if (resultadoInserirQuiz.length == 1) {
                        console.log(resultadoInserirQuiz);

                       
                                    res.json({
                                        idQuiz: resultadoInserirQuiz[0].idQuiz,
                                        acertos: resultadoInserirQuiz[0].acertos,
                                        fkUsuario: resultadoInserirQuiz[0].fkUsuario
                                                                             
                                    });
                                
                            

                    } else if (resultadoInserirQuiz.length == 0) {
                        res.status(403).send("idQuiz inválido");
                    } else {
                        res.status(403).send("SEI LÁ fkUsuario");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o idQuiz Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}



function VerPontosUsuario(req, res) {
    var fkQuiz = req.body.fkQuizServer;

    if (fkQuiz == undefined) {
        res.status(400).send("Seu quiz está undefined!");
    } else {

        quizModel.VerPontosUsuario( fkQuiz)
            .then(
                function (resultadoPontosUsuario) {
                    console.log(`\nResultados encontrados: ${resultadoPontosUsuario.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoPontosUsuario)}`); // transforma JSON em String

                    if (resultadoPontosUsuario.length == 1) {
                        console.log(resultadoPontosUsuario);

                       
                                    res.json({
                                        fkQuiz: resultadoPontosUsuario[0].fkQuiz
                                                                             
                                    });
                                
                            

                    } else if (resultadoPontosUsuario.length == 0) {
                        res.status(403).send("fkQuiz inválido");
                    } else {
                        res.status(403).send("SEI LÁ");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o fkQuiz Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function qtdAcertosPorQuestao(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo quiz.html
    var idQuiz = req.body.idQuestaoServer;
    var acertos = req.body.acertosServer;
    
    

    // Faça as validações dos valores
    if (idQuiz == undefined) {
        res.status(400).send("Seu quiz está undefined!");
    } else if (acertos == undefined) {
        res.status(400).send("Seus acertos está undefined!");
    }  else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        quizModel.qtdAcertosPorQuestao(idQuiz, acertos)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o quiz! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    criarQuiz,
    InserirValoresQuiz,
    VerPontosUsuario,
    qtdAcertosPorQuestao
    
};