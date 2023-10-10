import { catalogo } from "../funcionalidades/catalogo.js";
import { adicionarAoCarrinho } from "../funcionalidades/carrinho.js";

function salvarLocalStorage (chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

function lerLocalStorage (chave) {
    return JSON.parse(localStorage.getItem(chave));
}

const idsProdutoFavoritos = lerLocalStorage("favoritos") ?? {};

export function removerDosFavoritos (idProduto) {
    delete idsProdutoFavoritos[idProduto];
    salvarLocalStorage("favoritos", idsProdutoFavoritos)
    renderizarProdutosFavoritos();
    favoritosCheckFalse(idProduto)
}

function criandoCard (idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerFavoritos = document.getElementById('container-favoritos');

    const elementoCard = document.createElement("div");

    elementoCard.classList.add("card__carrinho") 

    const cardProdutoCarrinho =
    `<img src="${produto.img}" alt="${produto.titulo}" class="imagem-card__carrinho">
    <div class="descricao-card__carrinho">
        <p class="titulo-card__carrinho">${produto.titulo}</p>
        <p class="tag-card__carrinho">${produto.genero}</p>
        <p class="preco-card__carrinho">$${produto.preco}</p>
        <div class="botoes-card__produto">
            <label for="checkbox-fav-${produto.id}">
                <button class="card__produto-botao botao__fav" id="remover-favorito-${produto.id}"><img src="./img/icons/icons8-gostei-preenchido-16.png" alt="" class="icons-card"></button>
            </label>
            <button class="card__produto-botao" id="adicionar-carrinho-${produto.id}"><img src="./img/icons/actions-bag-svgrepo-com.svg" alt="" class="icons-card"></button>
        </div>
    </div>`;

    elementoCard.innerHTML = cardProdutoCarrinho;
    containerFavoritos.appendChild(elementoCard);

    document.getElementById(`remover-favorito-${produto.id}`).addEventListener('click', () => removerDosFavoritos(produto.id))

    document.getElementById(`adicionar-carrinho-${produto.id}`).addEventListener('click', () => {
        adicionarAoCarrinho(produto.id)
        removerDosFavoritos(produto.id)  
    })
}

export function renderizarProdutosFavoritos () {
    const containerFavoritos = document.getElementById('container-favoritos');
    containerFavoritos.innerHTML = "";

    for (const idProduto in idsProdutoFavoritos) {
        criandoCard(idProduto)
        favoritosCheckTrue(idProduto)
    }
}

export function adicionarAosFavoritos (idProduto) {
    if (idProduto in idsProdutoFavoritos) {
        return;
    }
    idsProdutoFavoritos[idProduto] = 1;
    salvarLocalStorage("favoritos", idsProdutoFavoritos);
    criandoCard(idProduto);
}

export function favoritosCheckTrue (idProduto) {
    const checkboxFav = document.getElementById(`checkbox-fav-${idProduto}`);
    checkboxFav.checked = true;
    document.getElementById(`icon-coracao-${idProduto}`).src = "./img/icons/icons8-gostei-preenchido-16.png"
}

function favoritosCheckFalse (idProduto) {
    document.getElementById(`checkbox-fav-${idProduto}`).checked = false;
    document.getElementById(`icon-coracao-${idProduto}`).src = "./img/icons/actions-heart-svgrepo-com.svg"
}
