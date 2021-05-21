import * as notas from "../../assets/JavaScript/Notas.js"


export const crearTablasFormularios = await function(texto,objeto, cargar){
     
     const seccionTabla = document.createElement("section")
     seccionTabla.classList.add("seccionTabla")

     const encabezado = document.createElement("div")
     encabezado.classList.add("encabezadoTabla")
     seccionTabla.append(encabezado)

     const tituloTabla = document.createElement("h1")
     tituloTabla.classList.add("tituloTabla")
     tituloTabla.innerText="Gestionar "+ texto ;
     encabezado.append(tituloTabla)

     const div = document.createElement("div")
     encabezado.append(div)

     const inputTabla = document.createElement("input")
     inputTabla.classList.add("form-control","col-md-6","light-table-filter")
     inputTabla.setAttribute("data-table","order-table")
     inputTabla.type="text"
     inputTabla.placeholder="Buscar...";
     inputTabla.id="BuscarId"
     div.append(inputTabla)
     const tabla = document.createElement("table");
     tabla.classList.add("tablaAlumnos")
     const thead= document.createElement("thead");
     const tr = document.createElement("tr")
     tabla.append(thead)

     for (let index = 0; index < objeto.length; index++) {
          let th = document.createElement("th");
          th.innerText=objeto[index];
          tr.append(th)
          thead.append(tr);
     }
     const thAcciones= document.createElement("th");
     thAcciones.innerText="Acciones"
     tr.append(thAcciones);

     const tbody=document.createElement("tbody");
     tbody.classList.add("tbody");
     tabla.append(tbody)
     if (texto == "Alumnos") {
          cargar(tbody, 1)
     } else if (texto == "Docentes") {
          cargar(tbody, 2)
     } else {
          cargar(tbody);
     }
     
     seccionTabla.append(tabla)
     document.querySelector(".contenedorSection").append(seccionTabla);  
}
export function tablaNotas(){
     
const seccionTabla = document.createElement("section")
seccionTabla.classList.add("seccionTabla")
seccionTabla.innerHTML = " ";
const encabezado = document.createElement("div")
encabezado.classList.add("encabezadoTabla")
seccionTabla.append(encabezado)

const tituloTabla = document.createElement("h1")
tituloTabla.classList.add("tituloTabla")
tituloTabla.innerText="Gestionar Notas";
encabezado.append(tituloTabla)

const div = document.createElement("div")
encabezado.append(div)

const inputTabla = document.createElement("input")
inputTabla.classList.add("form-control","col-md-6","light-table-filter")
inputTabla.setAttribute("data-table","order-table")
inputTabla.type="text"
inputTabla.placeholder="Buscar...";
inputTabla.id="BuscarId"
div.append(inputTabla)
const tabla = document.createElement("table");
tabla.classList.add("tablaAlumnos")
const thead= document.createElement("thead");
const tbody = document.createElement("tbody");
tbody.classList.add("tbodyNotas");
thead.classList.add("theadNotas")
tabla.append(thead)
tabla.append(tbody)
notas.listarThead("periodoes")
notas.listarNotas();
seccionTabla.append(tabla)
document.querySelector(".contenedorSection").append(seccionTabla);

}