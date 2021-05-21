import * as modal from "../../js/modal/modales.js"

const boton = document.getElementById("ButtonAdd");
const inputNombre = document.getElementById("nombre");
const inputId = document.getElementById("idMateria");
const nombreEditar = document.getElementById("nombreEditar");
const btnGuardarMateria = document.getElementById("ButtonAddEditar");
const arrayMaterias = [];
console.log(inputId)
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

// boton.addEventListener("click", (e) => {
//   if (
//     arrayMaterias.some((materias) => inputNombre.value == materias) ||
//     inputNombre.value == "" ||
//     inputNombre.value == null ||
//     inputNombre.value == undefined
//   ) {
//     e.preventDefault();
//     swal(
//       "¡Transaccion Fallida! ",
//       "Campos Vacios",
//       "error"
//     );
//     inputNombre.value = "";
//   } else {
//     e.preventDefault();
//     Agregar(inputNombre.value),
//       swal("¡Transaccion Exitosa! ", "-Has Agregado un Materia", "success");
//     inputNombre.value = "";
//   }
// });

//visualizarInformación
 function llenarTabla(materia,tabla) {
  let filaMateria = document.createElement("tr");
  filaMateria.setAttribute("data-id", materia.Id); 

  const tdNombreMateria = document.createElement("td");
  tdNombreMateria.innerHTML = materia.Nombre;
  filaMateria.append(tdNombreMateria)
  
  const tdBotones = document.createElement("td");
  tdBotones.classList.add("tdBoton");
  filaMateria.append(tdBotones);

  const botonEditar = document.createElement("button");
  botonEditar.classList.add("buttonEditar");
  botonEditar.innerText="Editar";
  tdBotones.append(botonEditar);
  botonEditar.addEventListener("click",()=>modal.AbrirEditar(materia.Id, materia.Nombre))

  const botonEliminar = document.createElement("button");
  botonEliminar.classList.add("buttonEliminar");
  botonEliminar.innerText="Eliminar";
  tdBotones.append(botonEliminar);
  botonEliminar.addEventListener("click",()=>ConfirmarEliminar(materia.Id))

  // filaMateria.innerHTML += `<td class="tdBoton "><button class="buttonEditar "onclick="AbrirEditar(${materia.Id},'${materia.Nombre}')">Editar</button>
  //   <button class=" buttonEliminar" onclick="ConfirmarEliminar(${materia.Id})">Eliminar</button></td>`;
  tabla.appendChild(filaMateria);
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
    tabla.removeChild(tr);
  });
}
function ConfirmarEliminar(id) {
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
