const estacao = document.getElementById("estacao");
const body = document.getElementById("body");
const esdras = document.getElementById("esdras");
const title = document.getElementById("title");
const voltar = document.getElementById("voltar");

const togglestation = () => {
    estacao.classList.toggle("hidden");
    body.classList.toggle("teste");
    voltar.classList.toggle("hidden");
}

const toggleoff = () => {
    estacao.classList.remove("hidden");
    body.classList.remove("teste");
}

togglestation()

function teste(){
    togglestation()
    esdras.classList.toggle("hidden");
    title.classList.toggle("hidden");
}

function botao() {
    togglestation()
    esdras.classList.remove("hidden");
    title.classList.remove("hidden");
    window.scrollTo(0, 0);
}