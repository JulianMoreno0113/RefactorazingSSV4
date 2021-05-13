export const crearInputsFormularios = function(elementos){
	const contenedorSection = document.querySelector(".contenedorSection");
	contenedorSection.innerHTML="";

	const seccionFormulario = document.createElement("section");
	seccionFormulario.classList.add("seccionFormulario");
	contenedorSection.append(seccionFormulario);
	seccionFormulario.innerHTML="";

	const tituloForm = document.createElement("h1");
	tituloForm.classList.add("tituloForm");
	tituloForm.append("Agregar");
	seccionFormulario.append(tituloForm);

	const formulario = document.createElement("form");
	formulario.classList.add("frm", "formulario");
	formulario.id = "formulario";
	seccionFormulario.append(formulario);	
	formulario.innerHTML ="";

    const contenedorInputs = document.createElement("div");
	contenedorInputs.classList.add("contenedorInputs");
	contenedorInputs.innerHTML=""

	let grupo_nombre=0;
    for (let i = 0; i < elementos.length; i++) {
			
			grupo_nombre = document.createElement("div");
			grupo_nombre.classList.add("formulario__grupo");
			grupo_nombre.id = "grupo_" + elementos[i];

			const nombreLabel = document.createElement("label");
			nombreLabel.for = "nombre";
			nombreLabel.classList.add("formulario__label");
			nombreLabel.innerText = elementos[i];
			grupo_nombre.append(nombreLabel);

			const inputNombreDiv = document.createElement("div");
			inputNombreDiv.classList.add("formulario__grupo-input");
			grupo_nombre.append(inputNombreDiv);

			const inputNombre = document.createElement("input");
			inputNombre.type = "text";
			inputNombre.id = "nombre";
			inputNombre.classList.add("formulario__input");
			inputNombre.name = "nombre";
			inputNombre.placeholder = "Escribe el nombre";
			inputNombreDiv.append(inputNombre);

			const iconoNombre = document.createElement("i");
			iconoNombre.classList.add(
				"formulario__validacion-estado",
				"documento",
				"fas",
				"fa-times-circle"
			);
			inputNombreDiv.append(inputNombre);

			const pNombre = document.createElement("p");
			pNombre.classList.add("formulario__input-error");
			pNombre.innerText =
				"El nombre debe tener al menos un digito y solo puede contener letras y espacios";
			inputNombreDiv.append(pNombre);

			
            contenedorInputs.append(grupo_nombre);
		}
			formulario.append(contenedorInputs);
			console.log(contenedorSection);
			return contenedorSection;    
}