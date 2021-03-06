import * as validacion from "../../assets/JavaScript/validaciones.js";
import * as texto from "../tablas/tablas.js";
import * as modal from "../modal/modales.js";
import { Editar } from "../../assets/JavaScript/Materia.js";
  
export const crearInputsFormularios = function (elementos,texto,agregar,editar) {
  const contenedorSection = document.querySelector(".contenedorSection");
  contenedorSection.innerHTML = "";

  const seccionFormulario = document.createElement("section");
  seccionFormulario.classList.add("seccionFormulario", "ver", "hidden");
  contenedorSection.append(seccionFormulario);
  seccionFormulario.innerHTML = "";

  const tituloForm = document.createElement("h1");
  tituloForm.classList.add("tituloForm");
  tituloForm.append("Agregar "+texto);
  seccionFormulario.append(tituloForm);

  const formulario = document.createElement("form");
  formulario.classList.add("frm", "formulario");
  formulario.id = "formulario";
  seccionFormulario.append(formulario);
  formulario.innerHTML = "";

  const contenedorInputs = document.createElement("div");
  contenedorInputs.classList.add("contenedorInputs");
  contenedorInputs.innerHTML = "";

  let grupo_nombre = 0;
  for (let i = 0; i < elementos.length; i++) {
    let inputNombre = 0;
    if (elementos[i] === "tipoDoc") {
      const divSelect = document.createElement("div");
      divSelect.classList.add("formulario__grupo");

      const labelSelect = document.createElement("label");
      labelSelect.for = "tipoId";
      labelSelect.classList.add("formulario__label");
      labelSelect.innerText = "tipoDocumento:";

      const divSelectTd = document.createElement("div");
      divSelectTd.classList.add("formulario__grupo-input");

      inputNombre = document.createElement("select");
      inputNombre.classList.add("formulario__input");
      inputNombre.id = "tipoId";

      const opcionDefecto = document.createElement("option");
      opcionDefecto.innerText="Seleccione...";


      const opcionCC = document.createElement("option");
      opcionCC.value = "1";
      opcionCC.innerText = "CC";

      const opcionTI = document.createElement("option");
      opcionTI.value = "2";
      opcionTI.innerText = "TI";

      divSelect.append(labelSelect);
      divSelect.append(divSelectTd);
      divSelect.append(inputNombre);
      inputNombre.append(opcionDefecto);
      inputNombre.append(opcionCC);
      inputNombre.append(opcionTI);

      contenedorInputs.append(divSelect);

    }
    else if(elementos[i] === "Estado") {
      
        }else {
      grupo_nombre = document.createElement("div");
      grupo_nombre.classList.add("formulario__grupo");
      grupo_nombre.id = "grupo__" + elementos[i];

      const nombreLabel = document.createElement("label");
      nombreLabel.for = elementos[i];
      nombreLabel.classList.add("formulario__label");
      nombreLabel.innerText = elementos[i];
      grupo_nombre.append(nombreLabel);

      const inputNombreDiv = document.createElement("div");
      inputNombreDiv.classList.add("formulario__grupo-input");
      grupo_nombre.append(inputNombreDiv);

      inputNombre = document.createElement("input");
      inputNombre.type = "text";
      inputNombre.id = elementos[i];
      inputNombre.classList.add("formulario__input");
      inputNombre.name = elementos[i];
      inputNombre.placeholder = `Escribe el ${elementos[i]}`;
      inputNombreDiv.append(inputNombre);

      const iconoNombre = document.createElement("i");
      iconoNombre.classList.add(
        "formulario__validacion-estado",
        "documento",
        "fas",
        "fa-times-circle"
      );
      grupo_nombre.append(iconoNombre)
      inputNombreDiv.append(inputNombre);

      const pNombre = document.createElement("p");
      pNombre.classList.add("formulario__input-error");
      pNombre.innerText =
        "El nombre debe tener al menos un digito y solo puede contener letras y espacios";
      inputNombreDiv.append(pNombre);

      contenedorInputs.append(grupo_nombre);
    }
  }
  formulario.append(contenedorInputs);
  const divBotonAgregar = document.createElement("div");
  divBotonAgregar.classList.add("buttons");
  formulario.append(divBotonAgregar);

  const botonAgregar = document.createElement("input");
  botonAgregar.type = "button";
  botonAgregar.value = "Agregar";
  botonAgregar.id = "btnAgregar";
  botonAgregar.addEventListener('click',function(e){
    agregar(e);
  })


  const hr = document.createElement("hr");
  seccionFormulario.append(hr);
  divBotonAgregar.append(botonAgregar);

  
  contenedorSection.append(modal.crearModal(elementos,texto,editar))
  return contenedorSection;
  
};