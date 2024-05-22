import { catalogo } from "../funcionalidades/catalogo.js";

//carinho no checkout
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

//alertas da pagina
const botaoCancelarCompra = document.getElementById('botao-cancelar-compra');

botaoCancelarCompra.addEventListener('click', () => {
    Swal.fire({
        title: "Tem certeza?",
        html: `<p class="alerta-texto">Cancelar a compra irá te levar para a página inicial. Seu carrinho continuará com os mesmo itens.</p>`,
        icon: "warning",
        iconColor: "#000000",
        showCancelButton: true,
        confirmButtonText: "Cancelar compra",
        cancelButtonText: "Continuar comprando",
        buttonsStyling: false,
        customClass: {
            title: 'alerta-titulo',
            text: 'alerta-texto',
            icon: 'alerta-icone',
            confirmButton: 'alerta-btn alerta-btn-confirm',
            cancelButton: 'alerta-btn alerta-btn-cancel',
            }
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            html: `<p class="alerta-texto">Sua compra foi cancelada.</p>`,
            icon: "error",
            iconColor: "#000000",
            buttonsStyling: false,
            customClass: {
            confirmButton: 'alerta-btn alerta-btn-confirm',
            }
            });
    
            setTimeout(() => {window.location.href = "index.html"}, 1500)
        }
        });
})

//mascara de formulario
$('#input-telefone').mask('(00) 00000-0000');
$('#input-cpf').mask('000.000.000-00', {reverse: true});
$('#input-cep').mask('00000-000');
$('#input-uf').mask('AA', {
    translation: {
      'A': {
        pattern: /[A-Za-z]/,
      }
    }
  });
$('#input-cartao-numero').mask('0000 0000 0000 0000');
$('#input-cartao-cvc').mask('000');
$('#input-cartao-validade').mask('00/00');

//validaçao do formulario
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
                'input-telefone': "Telefone não preenchido, ",
                'input-email': "Email não preenchido, ",
                'input-cpf': "CPF não preenchido, ",
                'input-endereco': "Endereço não preenchido, ",
                'input-cep': "CEP não preenchido, ",
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

        e.preventDefault();

        Swal.fire({
            html: `<p class="alerta-texto">Sua compra foi realizada.</p>`,
            icon: "success",
            iconColor: "#000000",
            confirmButton: "O",
            buttonsStyling: false,
            customClass: {
            confirmButton: 'alerta-btn alerta-btn-confirm',
            }
        }).then((result) => {
            if (result.isConfirmed){
                localStorage.removeItem("carrinho")
                window.location.href = "index.html"
            };
        })
    })
}

