import * as inputs from "./inputs.js"
export const crearFormularios = function(vista){

    const seccionFormulario = document.createElement("section");
    seccionFormulario.classList.add("seccionFormulario")

    const tituloForm = document.createElement("h1");
    tituloForm.classList.add("tituloForm");
    tituloForm.append("Agregar")
    seccionFormulario.append(tituloForm);

    const formulario = document.createElement("form");
    formulario.classList.add("frm","formulario");
    formulario.id = "formulario";
    seccionFormulario.append(formulario);

    const contenedorInputs = document.createElement("div");
    contenedorInputs.classList.add("contenedorInputs");
    formulario.append(contenedorInputs);

    contenedorInputs.append(inputs.crearInputsFormularios());

    return seccionFormulario;

}