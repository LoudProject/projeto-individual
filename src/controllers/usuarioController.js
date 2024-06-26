var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                       
                                    res.json({
                                        id: resultadoAutenticar[0].idUsuario,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha                                     
                                    });
                                
                            

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    // var confirmarSenha = req.body.confirmarSenha;
    var jogo = req.body.lista_jogo;
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, jogo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function pegarJogos(req, res) {
        usuarioModel.pegarJogos()
            .then(
                function (resultadoAutenticar) {
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                        console.log(resultadoAutenticar);
                        res.json({
                            valorant: resultadoAutenticar[0].valorant,                               
                            lol: resultadoAutenticar[0].lol,                                  
                            freefire: resultadoAutenticar[0].freefire                                   
                        });             
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao procurar os jogos! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    

}

function verificar(req, res) {
    fkUsuario = req.body.fkUsuarioServer;
    usuarioModel.verificar(fkUsuario)
        .then(
            function (resultadoAutenticar) {
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                    console.log(resultadoAutenticar);
                    res.json({
                        idQuiz: resultadoAutenticar[0].idQuiz                                
                    });             
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao tentar achar o id! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

function porcentagem(req, res) {
    fkQuiz = req.body.fkQuizServer;
    usuarioModel.porcentagem(fkQuiz)
        .then(
            function (resultadoAutenticar) {
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                    console.log(resultadoAutenticar);
                    res.json({
                        acertos: resultadoAutenticar[0].acertos                                  
                    });             
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao procurar os jogos! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}



module.exports = {
    autenticar,
    cadastrar,
    pegarJogos,
    verificar,
    porcentagem
}