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

let escolherCompras = {
    "instrumentos-menu": document.querySelector(".instrumentos"),
    "fundos-menu": document.querySelector(".fundos"),
    "bixos-menu": document.querySelector(".bixos-malucos")
};

Object.keys(escolherCompras).forEach(menuID => {
    let botao = document.querySelector(`#${menuID}`);
    botao.addEventListener("click", function () {
        Object.values(escolherCompras).forEach(aba => aba.style.display = "none");
        escolherCompras[menuID].style.display = "block";
    });
});

let produtos = document.querySelectorAll(".compras .produto");
let body = document.querySelector("body");

produtos.forEach(produto => {
    produto.addEventListener("click", function () {
        let preco = parseInt(produto.getAttribute("data-preco")); 
        let nome = produto.getAttribute("data-nome"); 
        let item = produto.getAttribute("data-adquirido"); 
        if (produto.classList.contains("bloqueado")) {
            if (pontos >= preco) 
                {
                pontos -= preco;
                pontosDisplay.textContent = pontos;
                produto.classList.remove("bloqueado");
            } 
            else {
                alert("POBRE HAHAHAHAHA");
            }
        }
        else if (item === "fundo") {
            if (body.classList.contains(nome)) {
                body.classList.remove(nome);
            } 
            else {
                body.classList.add(nome);
            }
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