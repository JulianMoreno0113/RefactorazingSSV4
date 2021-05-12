import * as enlaces from "./links.js"

export const crearNav = function(){

        const nav = document.createElement('nav');
        nav.classList.add('nav-bar','ver')


        const ul = document.createElement('ul');
        ul.classList.add("menu");
        nav.append(ul);


        const listaEnlaces = [
            {texto:"inicio",ruta:"index.html",icono:"home 1.svg"},
            {texto:"Notas",ruta:"views/notas.html",icono:"los-grados 1.svg"},
            {texto:"Periodos",ruta:"views/periodos.html",icono:"periodos.svg"},
            {texto:"Reportes",ruta:"views/reportes.html",icono:"lista-de-verificacion 1.svg"},
            {texto:"Alumnos",ruta:"views/alumnos.html",icono:"sombrero-de-graduacion 1.svg"},
            {texto:"Docentes",ruta:"views/maestros.html",icono:"aula 1.svg"},
            {texto:"Materias",ruta:"views/materias.html",icono:"libro 1.svg"}
        ];

        const htmlListas = listaEnlaces.map(enlaces.crearEnlaces);

        const agregarAl = padre => (el)=> padre.append(el);
        const agregarAlUl = agregarAl(ul);
        
        htmlListas.forEach(agregarAlUl);
        
        return nav;
}