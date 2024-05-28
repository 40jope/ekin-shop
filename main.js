import { expondoCatalogo } from "./funcionalidades/expondo-catalogo.js";
import { abrirMenu, fecharMenu } from "./funcionalidades/menus.js"
import { renderizarProdutosCarrinho, atualizarPrecoCarrinho, verificarStorageCarrinho } from "./funcionalidades/carrinho.js";
import { renderizarProdutosFavoritos, favoritosCheckTrue } from "./funcionalidades/favoritos.js";
import { filtroProduto, filtroGenero } from "./funcionalidades/filtro.js"
import { catalogo } from "./funcionalidades/catalogo.js";

// swiper
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
  });
  
document.querySelector(".topo-btn").addEventListener('click', () => {
    document.querySelector('body').scrollIntoView({ behavior: 'smooth' });
})

expondoCatalogo()
renderizarProdutosCarrinho()
renderizarProdutosFavoritos()
atualizarPrecoCarrinho()
verificarStorageCarrinho()

