let comprasSalvas = [];
const pontosDisplay = document.getElementById("pontos-display");
let botao1EL = document.querySelector('.botao1');
let BogaograndaoEL = document.querySelector('.bogagrandao');
let comprasEL = document.querySelector('.compras');
let multiplicador = 1;
let pontos = 9999999;
let instrumentosEL = document.querySelectorAll('.audioinstrumento');
let tocada = 0;
BogaograndaoEL.addEventListener("click", function () {
    pontos += multiplicador;
    pontosDisplay.textContent = pontos.toFixed(1);
    let burro = new Audio('audio/metal-pipe-clang.mp3');
    burro.play();
    burro.muted = true;
});

botao1EL.addEventListener("click", function () {
    if (comprasEL.style.display === "none" || comprasEL.style.display === "") {
        comprasEL.style.display = "block";
    } else {
        comprasEL.style.display = "none";
    }
});


//menu de escolhas
let escolherCompras = {
    "instrumentos-menu": document.querySelector("#instrumentos"),
    "fundos-menu": document.querySelector("#fundos"),
    "bixos-menu": document.querySelector("#bixos-malucos")
};

Object.keys(escolherCompras).forEach(menuID => { //francisco me ensinou muito mal, não entendi nada :/
    let botao = document.querySelector(`#${menuID}`);
    botao.addEventListener("click", function () {
        Object.values(escolherCompras).forEach(aba => aba.style.display = "none");
        escolherCompras[menuID].style.display = "grid";
        escolherCompras[menuID].style.gridTemplateColumns = "auto auto auto";
        escolherCompras[menuID].style.gridTemplateRows = "auto auto";
    });
});


//compras 
let bodyEL = document.querySelector('body');
let produtos = document.querySelectorAll(".produto");
let backgrounds = [
    "url('imgs/jardimBIZARRO.png')",
    "url('imgs/campusVarginha.jpg')",
    "url('imgs/inferno.jpg')",
    "url('imgs/camposverdejantes.jpg')",
    "url('imgs/STEVE.jpg')",
    "url('imgs/sofrimento-da-alice.png')",
    "url('imgs/FRANCISCO.jpg')"
];
let cadeadoEL = document.querySelectorAll(".cadeado");
let mensagem = document.querySelectorAll(".multiplicador");

produtos.forEach(produto => {

    let nome = produto.dataset.nome;
    let item = produto.dataset.tipo;
    let preco = produto.dataset.preco;
    let modificador = produto.dataset.multiplicado;
    let cadeado = produto.dataset.cadeado;
    produto.addEventListener("click", function () {
        if (produto.classList.contains("bloqueado")) {
            if (pontos >= preco) {
                pontos -= preco;
                pontosDisplay.textContent = pontos.toFixed(1);
                produto.classList.remove("bloqueado");
                let good = new Audio('audio/extremely-loud-correct-buzzer.mp3');
                good.play();
                cadeadoEL[cadeado].style.display = "none";
            }
        }
        if (produto.classList.contains('bloqueado')) {
            let pobre = new Audio('audio/lula-se-ta-caro-nao-compra.mp3');
            window.alert("POBRE HAHAHAHAH");

            pobre.play();
        }
        else if (item == "fundo") {
            for (let produto of produtos) {
                produto.classList.remove('equipado');
            }
            produto.classList.add('equipado');
            let imagem = backgrounds[nome];
            bodyEL.style.backgroundImage = imagem;
        }
        else if (item === "bixos") {
            let bixosDoidosEL = document.querySelector(`.imagem.${nome}`);
            if (bixosDoidosEL.style.display === "none" || bixosDoidosEL.style.display === "") {
                multiplicador *= modificador;
                bixosDoidosEL.style.display = "block";
                if (nome == 'esqueleto') {
                    let temp = new Audio('audio/rizz-sound-effect.mp3');
                    temp.play();
                }
                if (nome == 'alice') {
                    let temp = new Audio('audio/rizz-sound-effect.mp3');
                    temp.play();
                }
                if (nome == 'radiohead') {
                    let temp = new Audio('audio/solta-a-carta-tigrinho.mov');
                    temp.play();
                }
                if (nome == 'carrinho') {
                    let temp = new Audio('audio/derrapa.mp3');
                    temp.play()
                }
                if (nome == 'DJ') {
                    let temp = new Audio('audio/vineboom.mp3');
                    temp.play();
                }
                if (nome == 'AZULMAN') {
                    let temp = new Audio('audio/audio-novo-goofy.mov');
                    temp.play();
                }
                if (nome == 'giganteFM') {
                    let temp = new Audio('audio/som-do-zap-zap-estourado.mp3');
                    temp.play();
                }
            }
            else {
                multiplicador /= modificador;
                bixosDoidosEL.style.display = "none";
            }
        }
        else if (item == 'instrumentos') {
            let temp = instrumentosEL[cadeado];
            if (temp.muted == true) {
                temp.muted = false;
            }
            else {
                temp.muted = true;
            }
        }

    });
});
//musica



//mutar td
let botao2EL = document.querySelector('#botao2');
let audiosEL = document.querySelector('audio');
//tocar td
function tocatd(produto) {
    if (instrumentosEL[0].loop != true) {
        for (let audiofodido of instrumentosEL) {
            audiofodido.play();
            audiofodido.loop = true;
            audiofodido.muted = true;

        }
        if(produto)
        {
        instrumentosEL[produto.dataset.cadeado].muted=false;
        }
    }
}
for (let produto of produtos) {
    if (produto.dataset.tipo == 'instrumentos') {
        produto.addEventListener('click', (e)=>{
            tocatd(e.currentTarget);
        });
    }
}
//butao de salvar
let salvarEL = document.querySelector('#salvar');
let compras = [];
salvarEL.addEventListener('click', () => {
    localStorage.setItem('pontos', pontos);

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].classList.contains('bloqueado')) {
            compras[i] = 0;
        }
        else if (produtos[i].dataset.tipo == 'bixos') {
            let bixosDoidosEL = document.querySelector(`.imagem.${produtos[i].dataset.nome}`);
            if (bixosDoidosEL.style.display == 'block') {
                compras[i] = 2;
            }
            else {
                compras[i] = 1;
            }
        }
        else if (produtos[i].dataset.tipo == 'fundo') {
            console.log(backgrounds[produtos[i].dataset.nome]);
            console.log(bodyEL.style.backgroundImage);
            if (produtos[i].classList.contains('equipado')) {
                compras[i] = 2;
            }
            else {
                compras[i] = 1;
            }
        }
        else if (produtos[i].dataset.tipo == 'instrumentos') {
            if (instrumentosEL[produtos[i].dataset.cadeado].muted == true) {
                compras[i] = 1;
            }
            else {
                compras[i] = 2;
            }
        }
    }
    localStorage.setItem('compras', JSON.stringify(compras));
});
//butao de carregar
let carregarEL = document.querySelector('#carregar');
carregarEL.addEventListener('click', () => {
    pontos = parseInt(localStorage.getItem('pontos'));
    pontosDisplay.textContent = pontos.toFixed(1);
    //reseta td              
    bodyEL.style.backgroundImage = '';;
    multiplicador = 1;
    if (localStorage.getItem('compras')) {
        compras = localStorage.getItem('compras');
        compras = JSON.parse(compras);
        for (let i = 0; i < compras.length; i++) {
            let compra = compras[i];
            let produto = produtos[i];
            if (compra == 0) {
                produto.classList.add('bloqueado');
                cadeadoEL[produto.dataset.cadeado].style.display = ''
            }
            else {
                produto.classList.remove('bloqueado');
                cadeadoEL[produto.dataset.cadeado].style.display = 'none';
            }
            if (produto.dataset.tipo == 'bixos') {
                let bixosDoidosEL = document.querySelector(`.imagem.${produto.dataset.nome}`);

                if (compra != 2) {

                    bixosDoidosEL.style.display = 'none';
                }
                else {
                    bixosDoidosEL.style.display = 'block';
                    multiplicador *= produto.dataset.multiplicado;
                }
            }
            if (produto.dataset.tipo == 'fundo') {
                if (compra == 2) {
                    produto.classList.add('equipado');
                    bodyEL.style.backgroundImage = backgrounds[produto.dataset.nome];
                }
            }
            if (produto.dataset.tipo == 'instrumentos') {
                let instrumento = instrumentosEL[i];
                if (compra != 2) {

                    instrumento.muted = true;
                }
                else {
                    tocatd(null);
                    instrumento.muted = false;

                }
            }
        }
    }
});
