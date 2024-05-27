import { catalogo } from "../funcionalidades/catalogo.js";

//chamar todos os botoes de categoria
const tagFiltro = document.querySelectorAll('.tag-filtro');

//rodar uma rotina para cada um com o respectivo nome deles
tagFiltro.forEach ( (elemento) => {
    elemento.addEventListener('click', (e) => {
        filtroProduto(e.target.textContent)
        document.getElementById('container-produtos').scrollIntoView({ behavior: 'smooth' });
        //.scrollIntoView({ behavior: 'smooth' });
    })
})

// window.onload = () => {
//     document.querySelectorAll('.card__produto').classList.remove('esconder-card')
// }

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

//.classList.add('botao-filtro-ativo');

//rodar rotina pra mostrar tag do catalogo
//chamar funçao renderizar produto apenas para produtos correspondentes 