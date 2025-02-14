let comprasSalvas = [];
const pontosDisplay = document.getElementById("pontos-display");
let botao1EL = document.querySelector('.botao1');
let BogaograndaoEL = document.querySelector('.bogagrandao');
let comprasEL = document.querySelector('.compras');
let multiplicador = 1;
let pontos;

BogaograndaoEL.addEventListener("click", function () {
    pontos += multiplicador;
    pontosDisplay.textContent = pontos;
    let burro=new Audio('audio/vineboom.mp3');
    burro.play();
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
    "url('imgs/STEVE.jpg')"
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
        console.log(cadeadoEL[cadeado]);
        if (produto.classList.contains("bloqueado")) {
            if (pontos >= preco) {
                pontos -= preco;
                pontosDisplay.textContent = pontos;
                produto.classList.remove("bloqueado");
                let good=new Audio('audio/extremely-loud-correct-buzzer.mp3');
                good.play();
                cadeadoEL[cadeado].style.display = "none";
                //salvar a compra do produto
                for (let i = 0; i < produtos.length; i++) {
                    if (produtos[i].classList.contains('bloqueado')) {
                        comprasSalvas[i] = 0;
                    }
                    else {
                        comprasSalvas[i] = 1;
                    }

                }
                localStorage.setItem('compras', JSON.stringify(comprasSalvas));
                //salvar os pontos
                localStorage.setItem('pontos', pontos);
            }
            else {                
                let pobre=new Audio('audio/lula-se-ta-caro-nao-compra.mp3');
                window.alert("POBRE HAHAHAHAH");

                pobre.play();
            }
        }
        else if (item == "fundo") {
            let imagem = backgrounds[nome];
            bodyEL.style.backgroundImage = imagem;
        }
        else if (item === "bixos") {
            let bixosDoidosEL = document.querySelector(`.imagem.${nome}`);
            if (bixosDoidosEL.style.display === "none" || bixosDoidosEL.style.display === "") {
                multiplicador *= modificador;
                bixosDoidosEL.style.display = "block";
            }
            else {
                multiplicador /= modificador;
                bixosDoidosEL.style.display = "none";
            }

        }

    });
});
//salvar pontos
BogaograndaoEL.addEventListener('click', () => {
    window.localStorage.setItem('pontos', pontos);
});
//carregar pontos 
if (window.localStorage.getItem('pontos')) {
    pontos = parseInt(window.localStorage.getItem('pontos'));
}
else {
    pontos = 0;
}
pontosDisplay.textContent = pontos;
if (window.localStorage.getItem('produtos')) {
    comprasSalvas = window.localStorage.getItem('produtos');
    comprasSalvas = JSON.parse(comprasSalvas);
    console.log(comprasSalvas);
}
//carregar compra
console.log(localStorage.getItem('compras'));
if (localStorage.getItem('compras'))
{
    console.log('fghjfh');
    comprasSalvas = localStorage.getItem('compras');
    comprasSalvas = JSON.parse(comprasSalvas);
    for (let i = 0; i < comprasSalvas.length; i++) {
        if (comprasSalvas[i] == 1) {
            let temp = produtos[i];
            temp.classList.remove('bloqueado');
            cadeadoEL[temp.dataset.cadeado].style.display = 'none';
        }
    }
}