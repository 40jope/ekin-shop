import { catalogo } from "../funcionalidades/catalogo.js";

//chamar todos os botoes de categoria
const tagFiltro = document.querySelectorAll('.tag-filtro');

//rodar uma rotina para cada um com o respectivo nome deles
export function testLog () {


    tagFiltro.forEach ( (elemento) => {
        elemento.addEventListener('click', (e) => {
            //expondoCatalogo(e.tag)
            console.log(e.target.textContent)
        })
    })
    

    // catalogo.forEach ( (elemento) => {
    //     (elemento) => {
    //         console.log(e.target.textContent)}
    // })
}
//rodar rotina pra mostrar tag do catalogo
//chamar funçao renderizar produto apenas para produtos correspondentes 