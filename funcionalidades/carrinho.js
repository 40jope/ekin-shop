import { catalogo } from "../funcionalidades/catalogo.js";

function salvarLocalStorage (chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

function lerLocalStorage (chave) {
    return JSON.parse(localStorage.getItem(chave));
}

const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

function removerDoCarrinho (idProduto) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
    atualizarPrecoCarrinho()
    renderizarProdutosCarrinho();
    verificarStorageCarrinho ();
}

function adicionarQuantidadeProduto (idProduto) {
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
    atualizarPrecoCarrinho()
    atualizarInformacaoQuantidade(idProduto);
}

function subtrairQuantidadeProduto (idProduto) {
    if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
    atualizarPrecoCarrinho()
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade (idProduto) {
    document.getElementById(`quantidade-produto-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function criandoCard (idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerCarrinho = document.getElementById('container-carrinho');

    const elementoCard = document.createElement("div");

    elementoCard.classList.add("card__carrinho") 

    const cardProdutoCarrinho =
    `<img src="${produto.img}" alt="${produto.titulo}" class="imagem-card__carrinho">
    <div class="descricao-card__carrinho">
        <p class="titulo-card__carrinho">${produto.titulo}</p>
        <p class="tag-card__carrinho">${produto.genero}</p>
        <p class="preco-card__carrinho">$${produto.preco}</p>
        <div class="container__quantidade-carrinho">
            <div class="quantidade-card__carrinho">
                <button class="quantidade-botao" id="subtrair-produto-${produto.id}">-</button>
                <span class="quantidade-produto" id="quantidade-produto-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</span>
                <button class="quantidade-botao" id="adicionar-produto-${produto.id}">+</button>
            </div>
            <button class="remover__produto-carrinho" id="remover-produto-${produto.id}">
                <img src="./img/icons/excluir-icon.svg" alt="Remover do Carrinho">
            </button>
        </div>
    </div>`;

    elementoCard.innerHTML = cardProdutoCarrinho;
    containerCarrinho.appendChild(elementoCard);

    document.getElementById(`subtrair-produto-${produto.id}`).addEventListener('click', () => subtrairQuantidadeProduto(produto.id))

    document.getElementById(`adicionar-produto-${produto.id}`).addEventListener('click', () => adicionarQuantidadeProduto(produto.id))

    document.getElementById(`remover-produto-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id))
}

export function renderizarProdutosCarrinho () {
    const containerCarrinho = document.getElementById('container-carrinho');
    containerCarrinho.innerHTML = "";

    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        criandoCard(idProduto)
    }
}

export function adicionarAoCarrinho (idProduto) {
    if (idProduto in idsProdutoCarrinhoComQuantidade) {
        adicionarQuantidadeProduto(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    criandoCard(idProduto);
    atualizarPrecoCarrinho();
    verificarStorageCarrinho ();
} 

export function atualizarPrecoCarrinho () {
    const precoTotal = document.getElementById('preco-carrinho');

    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
        precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];

        precoTotal.innerText = `Total: R$${precoTotalCarrinho.toFixed(2).replace(".", ",")}`;
    }
}

const botaoCheckout = document.querySelector('#botao-comprar');

 export function verificarStorageCarrinho () {
    const storageCarrinho = localStorage.getItem('carrinho');

    if (!storageCarrinho || storageCarrinho === '{}') {
    atualizarPrecoCarrinho();
    document.getElementById('preco-carrinho').innerText = `Total: R$0,00`;
    botaoCheckout.disabled = true;
    botaoCheckout.classList.add('botao-comprar-desativado');
    } else {
    botaoCheckout.disabled = false;
    botaoCheckout.classList.remove('botao-comprar-desativado');
    }
}

botaoCheckout.addEventListener('click', () => {window.location.href = "checkout.html";})
