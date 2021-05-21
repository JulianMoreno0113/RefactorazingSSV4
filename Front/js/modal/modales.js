import * as texto from "../tablas/tablas.js";
import * as funcionModal  from "../../assets/JavaScript/funcionModal.js"
export const crearModal = await function(elementos,texto){

    const sectionModal = document.createElement("section");
    sectionModal.classList.add("sectionModal");

    const divModalUpdate = document.createElement("div");
    divModalUpdate.classList.add("modalUpdate");
    sectionModal.append(divModalUpdate);

    const headerModal = document.createElement("header");
    headerModal.classList.add("headerModal");
    divModalUpdate.append(headerModal);

    const tituloModal = document.createElement("h2");
    tituloModal.innerText ="Editar "+texto;
    headerModal.append(tituloModal);

    const cerrarModal = document.createElement("input");
    cerrarModal.setAttribute("type","button");
    cerrarModal.innerText="X";
    cerrarModal.classList.add("cerrar");
    cerrarModal.id="ButtonCloseEditar";
    headerModal.append(cerrarModal);

    const formularioModal = document.createElement("form");
    formularioModal.classList.add("frmEditar");
    divModalUpdate.append(formularioModal);

    const contenedorInputsEditar = document.createElement("div");
    contenedorInputsEditar.classList.add("contenedorInputsEditar");
    formularioModal.append(contenedorInputsEditar);

    let divInputLabel = 0;
    divInputLabel = document.createElement("div");
    contenedorInputsEditar.append(divInputLabel);

    for (let i = 0; i < elementos.length; i++) {
        const element = elementos[i];
        const labelModal = document.createElement("label");
        labelModal.setAttribute("for",elementos);
        labelModal.innerText=`${elementos} : `;
        divInputLabel.append(labelModal);

        const inputId = document.createElement("input");
        inputId.setAttribute("type", "hidden");
        inputId.id="id"+texto.substring(0,texto.length-1);
        
        divInputLabel.append(inputId);

        const inputNombre = document.createElement("input");
        inputNombre.setAttribute("type", "text");
        inputNombre.id="nombreEditar";
        inputNombre.placeholder="Escribe el Nombre";
        divInputLabel.append(inputNombre);
        }

        const divButtonsEditar = document.createElement("div");
        divButtonsEditar.classList.add("buttonsEditar");
        

        const inputGuardar = document.createElement("input");
        inputGuardar.setAttribute("type","button");
        inputGuardar.setAttribute("value","Guardar Cambios");
        inputGuardar.classList.add("guardarCambios");
        inputGuardar.id="ButtonAddEditar";
        // inputGuardar.addEventListener("click",)   
        divButtonsEditar.append(inputGuardar);
        formularioModal.append(divButtonsEditar);

    return sectionModal;    
    }
    
    export function AbrirEditar(id, nombre) {
        const inputId = document.getElementById("idMateria");
        funcionModal.OpenUpdate();
        inputId.value = id;
        nombreEditar.value = nombre;
    }
