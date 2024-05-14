import { catalogo } from "../funcionalidades/catalogo.js";

function lerLocalStorage (chave) {
    return JSON.parse(localStorage.getItem(chave));
}

const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

function criandoCard (idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerCarrinho = document.getElementById('container-carrinho-checkout');

    const elementoCard = document.createElement("div");

    elementoCard.classList.add("card-checkout") 

    const cardProdutoCarrinho =
    `<img src="${produto.img}" alt="${produto.titulo}" class="imagem-card-checkout">
    <div class="container-titulo-card-checkout">
            <p class="titulo-card-checkout">${produto.titulo}</p>
            <p class="tag-card-checkout">${produto.genero}</p>
    </div>
    <p class="preco-card-checkout">R$${produto.preco}</p>
    <div class="container-quantidade-card-checkout">
        <div class="quantidade-card-checkout">
            <span class="quantidade-produto-checkout" id="quantidade-produto-checkout-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]} und.</span>
    </div>`;

    elementoCard.innerHTML = cardProdutoCarrinho;
    containerCarrinho.appendChild(elementoCard);

}

function renderizarProdutosCarrinho () {
    const containerCarrinho = document.getElementById('container-carrinho-checkout');
    containerCarrinho.innerHTML = "";

    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        criandoCard(idProduto)
    }
}

function atualizarPrecoCarrinho () {
    const precoTotal = document.getElementById('preco-carrinho-checkout');

    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
        precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];

        precoTotal.innerText = `Total: R$${precoTotalCarrinho.toFixed(2).replace(".", ",")}`;
        
    }
}


renderizarProdutosCarrinho()
atualizarPrecoCarrinho()


const botaoCancelarCompra = document.getElementById('botao-cancelar-compra');

botaoCancelarCompra.addEventListener('click', () => {

    alert("Tem certeza que deseja abandonar Finalização de compra?")

    // window.location.href = "index.html";
})



const formCheckout = document.getElementById("formulario-checkout")

if (formCheckout) {
    
    formCheckout.addEventListener('submit', async (e) => {

        const formInput = document.querySelectorAll(".input-formulario-checkout");
        

        for (let contador = 0; contador < formInput.length; contador++) {
            const campoInput = formInput[contador];
            
            const nomeInput = campoInput.classList[0]

            var valueInputCheckout = document.getElementById(nomeInput).value;

            if (valueInputCheckout === "") {
                e.preventDefault();
                
                var listaAlertas = listaValidacaoInput();

                if (listaAlertas.hasOwnProperty(nomeInput)) {
                    document.getElementById("alerta").innerHTML = listaAlertas[nomeInput] + "é necessário preencher todos os campos." 
                } else {
                    document.getElementById("alerta").innerHTML = "Você esqueceu de preencher algum campos, é necessário preencher todos os campos."
                }

                return
            }
        }

        function listaValidacaoInput () {
            var listaValidacao = {
                'input-nome': "Nome não preenchido, ",
                'input-cpf': "CPF não preenchido, ",
                'input-email': "Email não preenchido, ",
                'input-endereco': "Endereço não preenchido, ",
                'input-numero': "Numero do endereço não preenchido, ",
                'input-bairro': "Bairro não preenchido, ",
                'input-cidade': "Cidade não preenchida, ",
                'input-uf': "Estado não preenchido, ", 
                'input-cartao-nome': "Nome de cartão não preenchido, ",
                'input-cartao-numero': "Numero de cartão não preenchido, ",
                'input-cartao-cvc': "CVC do cartão não preenchido, ",
                'input-cartao-validade': "Validade do cartão não preenchida, ",
            }

            return(listaValidacao)
        }

        alert("compra feita")
    })
}



