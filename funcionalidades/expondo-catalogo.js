import { catalogo } from "../funcionalidades/catalogo.js";
import { adicionarAoCarrinho } from "../funcionalidades/carrinho.js";
import { adicionarAosFavoritos, removerDosFavoritos, favoritosCheckTrue } from "../funcionalidades/favoritos.js";

export function expondoCatalogo () {
    for (const elemento of catalogo) {
        const cardProduto = 
        `<div class="card__produto ${elemento.tag} ${elemento.genero}" id="card-produto-${elemento.id}">
            <img src="${elemento.img}" alt="${elemento.titulo}" class="imagem-card__produto">
            <div class="descricao-card__produto">
                <p class="titulo-card__produto">${elemento.titulo}</p>
                <p class="genero-card__produto">${elemento.genero}</p>
                <p class="preco-card__produto">R$${elemento.preco}</p>
                <div class="botoes-card__produto">
                    <label for="checkbox-fav-${elemento.id}">
                        <input type="checkbox" class="checkbox-fav" id="checkbox-fav-${elemento.id}">
                        <button class="card__produto-botao botao__fav"><img src="./img/icons/actions-heart-svgrepo-com.svg" alt="" class="icons-card" id="icon-coracao-${elemento.id}"></button>
                    </label>
                    <button class="card__produto-botao" id="adicionar-carrinho-${elemento.id}"><img src="./img/icons/actions-bag-svgrepo-com.svg" alt="" class="icons-card"></button>
                </div>
            </div>
        </div>`;

    
    document.querySelector('#container-produtos').innerHTML += cardProduto;
    
    }
    
    for (const elemento of catalogo) {
        document.getElementById(`adicionar-carrinho-${elemento.id}`).addEventListener('click', () => {
            adicionarAoCarrinho(elemento.id)
        })
    }
    
    for (const elemento of catalogo) {
        document.getElementById(`checkbox-fav-${elemento.id}`).addEventListener('change', function() {
            if (this.checked) {
                adicionarAosFavoritos(elemento.id)
                favoritosCheckTrue(elemento.id)
            } else {
                removerDosFavoritos(elemento.id)
                document.getElementById(`icon-coracao-${elemento.id}`).src = "./img/icons/actions-heart-svgrepo-com.svg"
            }
        })
    }
}
