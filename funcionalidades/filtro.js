import { catalogo } from "../funcionalidades/catalogo.js";

const tagFiltro = document.querySelectorAll('.tag-filtro');

tagFiltro.forEach ( (elemento) => {
    elemento.addEventListener('click', (e) => {
        filtroProduto(e.target.textContent)
        document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
    })
})

export function filtroProduto (textoFiltro) {

    tagFiltro.forEach((button) => {
        if (textoFiltro.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add('botao-filtro-ativo');
        } else {
            button.classList.remove('botao-filtro-ativo');
        }
    })

    let cards = document.querySelectorAll('.card__produto');

    cards.forEach((e) => {
        if (textoFiltro == "Todos") {
            e.classList.remove("esconder-card");
        } else {
            if (e.classList.contains(textoFiltro)) {
                e.classList.remove("esconder-card");
            } else {
                e.classList.add("esconder-card");
            }
        }
    })
}

const generoProduto = document.querySelectorAll('.botao-filtro-genero');

generoProduto.forEach((elemento) => {
    elemento.addEventListener('click', (e) => {
        filtroGenero(e.target.textContent)
    })
})

export function filtroGenero (valor) {

    generoProduto.forEach((button) => {
        if (valor.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add('botao-filtro-genero-ativo');
        } else {
            button.classList.remove('botao-filtro-genero-ativo');
        }
    })

    let cards = document.querySelectorAll('.card__produto');

    cards.forEach((e) => {
        if (valor == "Todos") {
            e.classList.remove("esconder-card-genero");
        } else {
            if (e.classList.contains(valor)) {
                e.classList.remove("esconder-card-genero");
            } else {
                e.classList.add("esconder-card-genero");
            }
        }
    })
}
 