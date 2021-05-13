export const crearInputsFormularios = function(nombre,apellido,numeroDoc,tipoDoc,periodo){
    function nombre(){
    const grupo_nombre = document.createElement("div");
    grupo_nombre.classList.add("formulario__grupo");
    grupo_nombre.id = "grupo__nombre";

    const nombreLabel = document.createElement('label');
    nombreLabel.for = "nombre";
    nombreLabel.classList.add("formulario__label");
    nombreLabel.innerText = 'Nombre:';
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
}
function apellido (){const grupo_apellido = document.createElement("div");
    grupo_apellido.classList.add("formulario__grupo");
    grupo_apellido.id = "grupo__apellido";

    const apellidoLabel = document.createElement('label');
    apellidoLabel.for = "apellido";
    apellidoLabel.classList.add("formulario__label");
    apellidoLabel.innerText = 'Apellido:';
    grupo_apellido.append(apellidoLabel)

    const inputApellidoDiv = document.createElement("div")
    inputApellidoDiv.classList.add('formulario__grupo-input');
    grupo_apellido.append(inputApellidoDiv)

    const inputApellido = document.createElement("input")
    inputApellido.type = "text";
    inputApellido.id = "apellido";
    inputApellido.classList.add("formulario__input");
    inputApellido.name = "apellido";
    inputApellido.placeholder = "Escribe el apellido";
    grupo_apellido.append(inputApellido)

    const iconoApellido = document.createElement("i")
    iconoApellido.classList.add("formulario__validacion-estado","documento","fas" ,"fa-times-circle")
    grupo_apellido.append(iconoApellido)

    const pApellido = document.createElement("p")
    pApellido.classList.add("formulario__input-error");
    pApellido.innerText = ('El apellido debe tener al menos un digito y solo puede contener letras y espacios');
    inputApellidoDiv.append(pApellido);
    return grupo_apellido;
    }

    // const nombreLabel = document.createElement('label');
    // nombreLabel.for = "nombre";
    // nombreLabel.classList.add("formulario__label");
    // nombreLabel.innerText = 'Nombre';
    // grupo__nombre.append(nombreLabel)
}