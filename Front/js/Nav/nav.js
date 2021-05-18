import * as enlaces from "./links.js"
import {listarMateria}  from "../../assets/JavaScript/Materia.js"
import {ListarPeriodo}  from "../../assets/JavaScript/Periodos.js"
import {listarPersona}  from "../../assets/JavaScript/persona.js"
import {consultar}   from "../../assets/JavaScript/AsignarMateriasPersona.js"
import {listarThead}  from "../../assets/JavaScript/Notas.js"
import {listarAlumno}  from "../../assets/JavaScript/reportes.js"
import * as validacion from "../../assets/JavaScript/validaciones.js";

validacion.validacionesInputs();

export const crearNav = function(){

        const nav = document.createElement('nav');
        nav.classList.add('nav-bar','ver')


        const ul = document.createElement('ul');
        ul.classList.add("menu");
        nav.append(ul);


        const listaEnlaces = [
            {texto:"inicio",icono:"home 1.svg"},
            {texto:"Alumnos",icono:"sombrero-de-graduacion 1.svg",  data:[
                "nombre",
                "apellido",
                "numeroDoc",
                "tipoDoc"
              ]},
            {texto:"Docentes",icono:"aula 1.svg", data:[
                "nombre",
                "apellido",
                "numeroDoc",
                "tipoDoc"
              ]},
            {texto:"Materias", cargar:listarMateria,icono:"libro 1.svg", data:["nombre"], submenus:[
                {texto:"Alumno",cargar:ListarPeriodo,icono:"periodos.svg", data:["nombre", "porcentaje"]},
                {texto:"Profesor",cargar:ListarPeriodo,icono:"periodos.svg", data:["nombre", "porcentaje"]}
            ]},
            {texto:"Notas",cargar:listarThead,icono:"los-grados 1.svg",data:[""]},
            {texto:"Periodos",cargar:ListarPeriodo,icono:"periodos.svg", data:["nombre", "porcentaje"]},
            {texto:"Reportes",icono:"lista-de-verificacion 1.svg"}
        ];

        const htmlListas = listaEnlaces.map(enlaces.crearEnlaces);

        const agregarAl = padre => (el)=> padre.append(el);
        const agregarAlUl = agregarAl(ul);
        
        htmlListas.forEach(agregarAlUl);
        
        return nav;
}