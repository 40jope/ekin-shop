const formCheckout = document.getElementById("formulario-checkout")

if (formCheckout) {
    
    formCheckout.addEventListener('submit', async (e) => {

        const formInput = document.querySelectorAll(".input-formulario-checkout");
        

        for (let contador = 0; contador < formInput.length; contador++) {
            const campoInput = formInput[contador];
            
            const nomeInput = campoInput.classList[0]
            console.log(nomeInput)

            var valueInputCheckout = document.getElementById(nomeInput).value;

            if (valueInputCheckout === "") {
                e.preventDefault();
                
                var listaAlertas = listaValidacaoInput();
                console.log(listaAlertas);

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

