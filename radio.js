
let botao1EL = document.querySelector('.botao1');
let BogaograndaoEL = document.querySelector('.bogagrandao');
let comprasEL = document.querySelector('.compras');

let pontos = 0;
const pontosDisplay = document.getElementById("pontos-display");

BogaograndaoEL.addEventListener("click", function () {
    pontos++;
    pontosDisplay.textContent = pontos;
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
        escolherCompras[menuID].style.gridTemplateColumns= "auto auto auto";
        escolherCompras[menuID].style.gridTemplateRows= "auto auto";
    });
});



//compras 
let bodyEL=document.querySelector('body');
let produtos = document.querySelectorAll(".produto");
let backgrounds = [
    "url('imgs/jardimBIZARRO.png')",
    "url('imgs/campusVarginha.jpg')",
    "url('imgs/inferno.jpg')",
    "url('imgs/camposverdejantes.jpg')",
    "url('imgs/STEVE.jpg')"
];
let cadeadoEl = document.querySelectorAll(".cadeado");
let mensagem = document.querySelectorAll(".multiplicador");

produtos.forEach(produto => {
    
    let nome = produto.dataset.nome;
    let item = produto.dataset.tipo;
    let preco = produto.dataset.preco;
    let cadeado = produto.dataset.cadeado;
    produto.addEventListener("click", function () {
        console.log(cadeadoEl[cadeado]);
        if (produto.classList.contains("bloqueado")) {
            if (pontos >= preco) 
                {
                pontos -= preco;
                pontosDisplay.textContent = pontos;
                produto.classList.remove("bloqueado");
                cadeadoEl[cadeado].style.display = "none";
            } 
            else {
                alert("POBRE HAHAHAHAH");
            }
        }
         else if (item == "fundo")
        {
            let imagem = backgrounds[nome];
            bodyEL.style.backgroundImage = imagem;
        }
        else if (item === "bixos") {
            let bixosDoidosEL = document.querySelector(`.imagem.${nome}`);
            if (bixosDoidosEL.style.display === "none" || bixosDoidosEL.style.display === "") {
                bixosDoidosEL.style.display = "block";
            } 
            else {
                bixosDoidosEL.style.display = "none";
            }
        } 
        
    });
});
