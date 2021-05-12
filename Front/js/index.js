import * as nav from "./Nav/nav.js"

import * as formulario from "./formulariosCrud/formulario.js"



const contenedorNav = document.querySelector(".contenedorNav");
contenedorNav.append(nav.crearNav());



const contenedorSection = document.querySelector(".contenedorSection");
contenedorSection.append(formulario.crearFormularios())