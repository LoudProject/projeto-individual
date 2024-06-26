const perguntas = [
    {
        pergunta: "Em qual ano a organização foi fundada?",
        resposta: [
            {text: "2020", correct: false},
            {text: "2019", correct: true},
            {text: "2021", correct: false},
            {text: "2018", correct: false},
        ],
    },
    {
        pergunta: "Qual é o influenciador com mais seguidores da Loud atualmente?",
        resposta: [
            {text: "Coringa", correct: true},
            {text: "Gabe Peixe", correct: false},
            {text: "Saadhak", correct: false},
            {text: "Thurzin", correct: false},
        ],
    },
    {
        pergunta: "Qual jogador brasileiro assinou um contrato com a Loud em 2023?",
        resposta: [
            {text: "Rodrygo", correct: false},
            {text: "Vinícius Junior", correct: true},
            {text: "Richarlison", correct: false},
            {text: "Anthony", correct: false},
        ],
    },
    {
        pergunta: "Quantos CBLOL a Loud tem atualmente (2024) ?",
        resposta: [
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "4", correct: true},
            {text: "5", correct: false},
        ],
    },
    {
        pergunta: "Quais são os dois principais donos da Loud?",
        resposta: [
            {text: "Bruno e Ph", correct: false},
            {text: "Vini Jr e coringa", correct: false},
            {text: "Caiox e Castrin", correct: false},
            {text: "Jean e Bruno", correct: true},
        ],
    },
    {
        pergunta: "Quantos séries a Loud ganhou no MSI 2024 (Mundial de Lol)?",
        resposta: [
            {text: "0", correct: true},
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "1", correct: false},
        ],
    },
    {
        pergunta: "Qual jogo a Loud não possui uma line?",
        resposta: [
            {text: "Lol", correct: false},
            {text: "Rocket League", correct: true},
            {text: "Valorant", correct: false},
            {text: "Free Fire", correct: false},
        ],
    },
    {
        pergunta: "Em que ano a Loud conquistou o mundial de Valorant?",
        resposta: [
            {text: "2021", correct: false},
            {text: "2022", correct: true},
            {text: "2023", correct: false},
            {text: "Nenhuma das alternativas", correct: false},
        ],
    },
    {
        pergunta: "Qual era o time da Loud quando conquistaram o Champions em 2022?",
        resposta: [
            {text: "Aspas, Sacy, Saadhak, Tuyz e Less", correct: false},
            {text: "Pancada, Aspas, Saadhak, Less e Cauanzin", correct: false},
            {text: "Saadhak, Aspas, Less, Sacy e Cauazin", correct: false},
            {text: "Pancada, Less, Sacy, Saadhak e Aspas", correct: true},
        ],
    },
    {
        pergunta: "Qual o nome do time que ganhou da Loud na final do VCT LOCK/IN 2023 que aconteceu no Brasil?",
        resposta: [
            {text: "Drx", correct: false},
            {text: "Fnatic", correct: true},
            {text: "Optic", correct: false},
            {text: "Paper Rex", correct: false},
        ],
    },
]

let atualPerguntaIndex = 0;
let userScore = 0;

const comecarQuizEL = document.querySelector('.comecar-quiz');
const telaEl = document.querySelector('.tela');
const quizTelaEl = document.querySelector('.quizTela');
const perguntaEl = document.querySelector(".pergunta");
const respostasButtons = document.querySelector(".respostas");
const nextButtonEl = document.querySelector(".proximo-btn")


comecarQuizEL.addEventListener("click", comecarQuiz);

function comecarQuiz() {
    telaEl.style.display = "none";
    // quizTelaEl.style.display = "block";
    quizTelaEl.style.display = "flex";
    atualPerguntaIndex = 0;
    userScore = 0;
    nextButtonEl.innerHTML = "Próximo";
    nextButtonEl.style.display = "none"
    displayPergunta();
}

function displayPergunta() {
    resetContainer();
    perguntaEl.textContent = perguntas[atualPerguntaIndex].pergunta;
    perguntas[atualPerguntaIndex].resposta.forEach((resposta) => {
        const buttonEl = document.createElement("button");
        buttonEl.innerHTML = resposta.text;
        buttonEl.classList.add("respostaBtn")
        respostasButtons.appendChild(buttonEl);

        if (resposta.correct) {
            buttonEl.dataset.respostaCorreta = resposta.correct;
        }

        // console.log(buttonEl);

        buttonEl.addEventListener('click', checkResposta);
    });
}

var lista_respostas = [];

function checkResposta(e){
    const selectedButton = e.target;
    if(selectedButton.dataset.respostaCorreta){
        userScore++;
        console.log(userScore);
        lista_respostas.push(1)
        selectedButton.classList.add('respostaCorreta');
    } else {
        lista_respostas.push(0)
        selectedButton.classList.add('respostaErrada');

    }

    Array.from(respostasButtons.children).forEach(button=>{
        if(button.dataset.respostaCorreta ==='true'){
            button.classList.add("respostaCorreta");
        }
        button.disabled = 'true';

    })

    nextButtonEl.style.display = "block";
}

function displayResult() {
    resetContainer();
    perguntaEl.innerHTML = `<div class="voltarHome">
    <a href="index.html"><img src="assets/imgLoud.png"></a>
    </div> Quiz encerrado! <br> Você acertou: <span class="score">${userScore}/${perguntas.length}</span>`

    nextButtonEl.innerHTML = "Ver estatísticas";
}

function proximaPergunta(){
    atualPerguntaIndex++;
    if(atualPerguntaIndex<perguntas.length){
        displayPergunta();
        nextButtonEl.style.display = "none";
    } else {
        displayResult();
    }
}

nextButtonEl.addEventListener('click', function () {
    if(atualPerguntaIndex<perguntas.length){
        proximaPergunta();
    }else{
        window.location.href = "graficos.html"
    }
});


function resetContainer(){
    perguntaEl.textContent = "";
    respostasButtons.innerHTML = "";
}



function criarQuiz() {
    var id = sessionStorage.ID_USUARIO


    fetch("/quiz/criarQuiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: id
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO criarQuiz()!")
        console.log(resposta)

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log("Deu certo!");
                console.log(JSON.stringify(json));
                var dados = JSON.stringify(json);
                console.log(dados)
                console.log(dados[0])
                console.log(dados[0].pontos)
            });

        } else {

            console.log("Houve um erro ao tentar procurar os dados do !");
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}




InserirValoresQuiz();

function InserirValoresQuiz() {

    for (var contador = 0; contador < lista_respostas.length; contador++) {

        fetch("/quiz/VerValoresQuiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fkQuizServer: 2,
                idQuestaoServer: (contador + 1),
                acertosServer: lista_respostas[contador]
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
            console.log(resposta)
    
            if (resposta.ok) {
                console.log(resposta);
    
                resposta.json().then(json => {
                    console.log(json);
                    console.log("Funcionou");
                    console.log(JSON.stringify(json));
                    var dados = JSON.stringify(json);
                    console.log(dados)
                    console.log(dados[0])
                    console.log(dados[0].pontos)
                });
    
            } else {
    
                console.log("Houve um erro ao tentar procurar os dados do usuario!");
            }
    
        }).catch(function (erro) {
            console.log(erro);
        })
 
 
    }



    return false;
}


VerPontosUsuario();

function VerPontosUsuario() {


    fetch("/quiz/VerPontosUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkQuizServer: 2
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
        console.log(resposta)

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log("Funcionou");
                console.log(JSON.stringify(json));
                var dados = JSON.stringify(json);
                console.log(dados)
                console.log(dados[0])
                console.log(dados[0].pontos)
            });

        } else {

            console.log("Houve um erro ao tentar procurar os dados do usuario!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}


console.log(lista_respostas)

