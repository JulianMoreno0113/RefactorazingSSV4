export const boton = document.getElementById("btnAgregar");

// const inputId = document.getElementById("idMateria");
// const nombreEditar = document.getElementById("nombreEditar");
// const btnGuardarMateria = document.getElementById("ButtonAddEditar");
const arrayMaterias = [];

// btnGuardarMateria.addEventListener("click", () => {
//   Editar(inputId.value, nombreEditar.value);
// });

 export function listarMateria(tbody) {
  
  EjecutarPeticionServidor("Materias", "GET", null, function (materias) {
    materias.forEach((materia) => {
      arrayMaterias.push(materia.Nombre);
      llenarTabla(materia,tbody);
    });
  });
}

export function BotonAgregarEventListener (e)  {
  const inputNombre = document.getElementById("Nombre");
  if (
    arrayMaterias.some((materias) => inputNombre.value == materias) ||
    inputNombre.value == "" ||
    inputNombre.value == null ||
    inputNombre.value == undefined
  ) {
    e.preventDefault();
    swal(
      "¡Transaccion Fallida! ",
      `-Campos Vacios o
      -Campos repetidos`,
      "error"
    );
  } else {
    e.preventDefault();
    Agregar(inputNombre.value),
      swal("¡Transaccion Exitosa! ", "-Has Agregado un Materia", "success");
    inputNombre.value = "";
  }
};

//visualizarInformación
 function llenarTabla(materia,tabla) {
  let filaMateria = document.createElement("tr");

  filaMateria.innerHTML += "<td>" + materia.Nombre + "</td>";
  filaMateria.setAttribute("data-id", materia.Id);
  filaMateria.innerHTML += `<td class="tdBoton "><button class="buttonEditar "onclick="AbrirEditar(${materia.Id},'${materia.Nombre}')">Editar</button>
    <button id="btnEliminar${materia.Id}" class=" buttonEliminar">Eliminar</button></td>`;
  document.querySelector(".tbody").appendChild(filaMateria);
    document.getElementById("btnEliminar"+materia.Id).addEventListener('click',()=>{
      ConfirmarEliminar(materia.Id)
    })
  // inputNombre.value = "";
  // console.clear();
}

function Agregar(nombreMateria) {
  EjecutarPeticionServidor(
    "Materias",
    "POST",
    { Nombre: nombreMateria },
    llenarTabla
  );
}

function AbrirEditar(id, nombre) {
  OpenUpdate();
  inputId.value = id;
  nombreEditar.value = nombre;
}

function Editar(id, nombre) {
  if (nombre == "") {
    swal("¡Transaccion Fallida! ", "Campos Vacios", "error");
    return false;
  }

  const materiaEditar = {
    Id: parseInt(id),
    Nombre: nombre,
  };
  EjecutarPeticionServidor(
    "Materias/" + id,
    "PUT",
    materiaEditar,
    function (data) {
      let tr = document.querySelector(`tr[data-id="${id}"]`);

      tr.innerHTML = `<td>${nombre}</td><td class="tdBoton "><button class="buttonEditar "onclick="AbrirEditar(${id},'${nombre}')">Editar</button>
    <button class=" buttonEliminar" onclick="Eliminar(${id})">Eliminar</button></td>`;
    swal(
      "¡Transaccion Exitosa! ",
      "¡Se ha editado la materia! ",
      "success")
      limpiarDatos(), CloseUpdate();
    }
  );
}

function Eliminar(id) {
  ConfirmarEliminar();
  EjecutarPeticionServidor("Materias/" + id, "DELETE", { 
    Id: parseInt(id) 
  },function(data){
    let tr = document.querySelector(`tr[data-id="${id}"]`);
    document.querySelector(".tbody").removeChild(tr);
  });
}
export function ConfirmarEliminar(id) {
  swal({
    title: "Esta seguro de eliminar el alumno?",
    text: "No podra recuperar la información del alumno si lo elimina",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      Eliminar(id);
      swal("La materia ha sido eliminada correctamente", {
        icon: "success",
      });
    } else {
      swal("No se elimino la materia");
    }
  });
}

listarMateria();
