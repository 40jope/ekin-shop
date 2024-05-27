import { expondoCatalogo } from "./funcionalidades/expondo-catalogo.js";
import { abrirMenu, fecharMenu } from "./funcionalidades/menus.js"
import { renderizarProdutosCarrinho, atualizarPrecoCarrinho } from "./funcionalidades/carrinho.js";
import { renderizarProdutosFavoritos, favoritosCheckTrue } from "./funcionalidades/favoritos.js";
import { filtroProduto } from "./funcionalidades/filtro.js"
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
  

expondoCatalogo()
renderizarProdutosCarrinho()
renderizarProdutosFavoritos()
atualizarPrecoCarrinho()
// testLog()