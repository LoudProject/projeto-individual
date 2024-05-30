var database = require("../database/config")


function criarQuiz (idQuiz, fkUsuario){
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function criarQuiz(): ", idQuiz, fkUsuario)
    var instrucaoSql = `
        insert into Quiz values (${idQuiz}, ${fkUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

function InserirValoresQuiz(idQuestao, acertos, fkQuiz){
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function criarQuiz(): ", idQuestao, acertos, fkQuiz)
    var instrucaoSql = `
        insert into Questao values (${idQuestao}, ${acertos}, ${fkQuiz})
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




function VerPontosUsuario(fkQuiz) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function VerPontosUsuario(): ", fkQuiz)
    var instrucaoSql = `
        select sum(acertos) as pontos from Questao where fkQuiz = ${fkQuiz};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function qtdAcertosPorQuestao(idQuestao, acertos ) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdAcertosPorQuestao():",idQuestao, acertos );
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        select sum(${acertos}) from Questao where idQuestao = ${idQuestao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    criarQuiz,
    InserirValoresQuiz,
    VerPontosUsuario,
    qtdAcertosPorQuestao
    
};