export const crearInputsFormularios = function(nombre,apellido,numeroDoc,tipoDoc,periodo){
    
    const grupo_nombre = document.createElement("div");
    grupo_nombre.classList.add("formulario__grupo");
    grupo_nombre.id = "grupo_nombre";

    const nombreLabel = document.createElement('label');
    nombreLabel.for = "nombre";
    nombreLabel.classList.add("formulario__label");
    nombreLabel.innerText = 'Nombre';
    grupo_nombre.append(nombreLabel)

    const inputNombreDiv = document.createElement("div"); 
    inputNombreDiv.classList.add('formulario__grupo-input');
    grupo_nombre.append(inputNombreDiv);

    const inputNombre = document.createElement("input"); 
    inputNombre.type = 'text';
    inputNombre.id = "nombre";
    inputNombre.classList.add('formulario__input')
    inputNombre.name = "nombre";
    inputNombre.placeholder = "Escribe el nombre";
    inputNombreDiv.append(inputNombre);

    const iconoNombre = document.createElement("i"); 
    iconoNombre.classList.add('formulario__validacion-estado', 'documento', 'fas', 'fa-times-circle');
    inputNombreDiv.append(inputNombre);
    
    const pNombre = document.createElement("p");
    pNombre.classList.add('formulario__input-error');
    pNombre.innerText = 'El nombre debe tener al menos un digito y solo puede contener letras y espacios'
    inputNombreDiv.append(pNombre);

    return grupo_nombre;

    // const nombreLabel = document.createElement('label');
    // nombreLabel.for = "nombre";
    // nombreLabel.classList.add("formulario__label");
    // nombreLabel.innerText = 'Nombre';
    // grupo__nombre.append(nombreLabel)
}