export function abrirMenu (idBotao) {
    const elemento = document.querySelector(idBotao);
    
    elemento.setAttribute('data-menu', 'abrir');
}

export function fecharMenu (idBotao) {
    const elemento = document.querySelector(idBotao);
    
    elemento.setAttribute('data-menu', 'fechar');
}

const botoesAbrirMenu = document.querySelectorAll('[botao-abrir]');
const botoesFecharMenu = document.querySelectorAll('[botao-fechar]');

for (let contador = 0; contador < botoesAbrirMenu.length; contador++) {
    
    const botaoAbrir = botoesAbrirMenu[contador];
    const botaoCorrespondente = botaoAbrir.classList[1];
    const idBotao = `#display-${botaoCorrespondente}`;

    botaoAbrir.addEventListener('click', () => {
        abrirMenu(idBotao);
    })
}

for (let contador = 0; contador < botoesFecharMenu.length; contador++) {
    
    const botaoFechar = botoesFecharMenu[contador];
    const botaoCorrespondente = botaoFechar.classList[0];
    const idBotao = `#display-${botaoCorrespondente}`;

    botaoFechar.addEventListener('click', () => {
        fecharMenu(idBotao);
    })
}
