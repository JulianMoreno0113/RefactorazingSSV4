import * as enlaces from "./links.js"
import * as materia  from "../../assets/JavaScript/Materia.js"
import {ListarPeriodo}  from "../../assets/JavaScript/Periodos.js"
import {listarPersona}  from "../../assets/JavaScript/persona.js"
import {listarThead}  from "../../assets/JavaScript/Notas.js"
import {listarAlumno}  from "../../assets/JavaScript/reportes.js"

 
export const crearNav = function(){
 
        const nav = document.createElement('nav');
        nav.classList.add('nav-bar','ver')
 
        const ul = document.createElement('ul');
        ul.classList.add("menu");
        nav.append(ul);
 
        const listaEnlaces = [
          {texto:"Inicio",icono:"home 1.svg"},
          {texto:"Alumnos",cargar:listarPersona, icono:"sombrero-de-graduacion 1.svg",  data:[
              "Nombre",
              "Apellidos",
              "NumeroDoc",
              "TipoDoc",
              "Estado"
            ]},
          {texto:"Docentes",cargar:listarPersona,icono:"aula 1.svg", data:[
              "Nombre",
              "Apellidos",
              "NumeroDoc",
              "TipoDoc",
              "Estado"
            ]},
          {texto:"Materias", cargar:materia.listarMateria,icono:"libro 1.svg", data:["Nombre"], submenus:[
              {texto:"Alumno",cargar:ListarPeriodo,icono:"periodos.svg", data:["Nombre", "Porcentaje"]},
              {texto:"Profesor",cargar:ListarPeriodo,icono:"periodos.svg", data:["Nombre", "Porcentaje"]}
          ],agregar:materia.BotonAgregarEventListener,editar:materia.Editar},
          {texto:"Notas",cargar:listarThead,icono:"los-grados 1.svg",data:[""]},
          {texto:"Periodos",cargar:ListarPeriodo,icono:"periodos.svg", data:["Nombre", "Porcentaje"]},
          {texto:"Reportes",cargar:listarAlumno,icono:"lista-de-verificacion 1.svg",data:["Nombre del estudiante","Identificación"]}
      ];
        const htmlListas = listaEnlaces.map(enlaces.crearEnlaces);
 
        const agregarAl = padre => (el)=> padre.append(el);
        const agregarAlUl = agregarAl(ul);
        
        htmlListas.forEach(agregarAlUl);
        
        return nav;
        
}