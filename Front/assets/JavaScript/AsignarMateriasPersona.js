const tabla = document.querySelector(".tbody");
const notaNull = document.getElementById("notaNull");
const boton = document.getElementById("ButtonAdd");
const btnEditarPersona = document.querySelector("#ButtonAddEditar");
const idMateriaPersona = document.getElementById("idMateriaPersona");
const MateriaEditar = document.getElementById("MateriaEditar");
const EditarNota = document.getElementById("EditarNota");
const nombrePersona = document.getElementById("nombrePersona");
const nombreMateria = document.getElementById("nombreMateria");
const personaEditar = document.getElementById("personaEditar");
const htmlLocation = window.location.href;
const arrayMateria = [];
let arrayalumnos = [];
const urlHost = "http://127.0.0.1:5500";

function seleccionarMateria(select) {
  EjecutarPeticionServidor("Materias", "GET", null, function (materias) {
    materias.forEach((materia) => {
      select.innerHTML += `<option value = ${materia.Id}>  ${materia.Nombre}    </option>`;
    });
  });
}
function seleccionarPersona(select) {
	EjecutarPeticionServidor("Personas/ConsultarTodo","GET",null,function(personas){
		personas.forEach((persona) => {
			if (
			  persona.Tp_Id == 2 &&
			  htmlLocation == urlHost + "/Front/views/asignar_materia_profesor.html" &&
			  persona.Activo
			) {
			  select.innerHTML += `<option value = ${persona.Id}>  ${persona.Nombres} ${persona.Apellidos} </option>`;
			} else if (
			  persona.Tp_Id == 1 &&
			  htmlLocation == urlHost + "/Front/views/asignar_materia_alumno.html" &&
			  persona.Activo
			) {
			  select.innerHTML += `<option value = ${persona.Id}>  ${persona.Nombres} ${persona.Apellidos} </option>`;
			  arrayalumnos.push(persona);
			}
		  })
	})

}
async function consultar() {
  await EjecutarPeticionServidor("PersonaMaterias", "GET", null, llenarTabla);
}

function llenarTabla(materias) {
  html = " ";
  materias.forEach((materia) => {
    arrayMateria.push(materia);
    if (
      materia.TipoPersona == 2 &&
      htmlLocation == urlHost + "/Front/views/asignar_materia_profesor.html"
    ) {
      html += `<tr id="tr" data-id="${materia.Id}">
          <td>${materia.NombrePersona}  ${materia.ApellidoPersona}</td>
          <td>${materia.Materia}</td>

          <td class="tdBoton "><button class="buttonEditar "onclick="AbrirEditar('${materia.Id}','${materia.IdPersona}', '${materia.IdMateria}')">Editar</button>
    	  <button class=" buttonEliminar" onclick="ConfirmarEliminar(${materia.Id})">Eliminar</button></td>

          </tr>`;
      tabla.innerHTML = html;
    } else if (
      materia.TipoPersona == 1 &&
      htmlLocation == urlHost + "/Front/views/asignar_materia_alumno.html"
    ) {
      html += `<tr id="tr" data-id="${materia.Id}">
          <td>${materia.NombrePersona}  ${materia.ApellidoPersona}</td>
          <td>${materia.Materia}</td>

          <td class="tdBoton "><button class="buttonEditar "onclick="AbrirEditar('${materia.Id}','${materia.IdPersona}', '${materia.IdMateria}')">Editar</button>
    	  <button class=" buttonEliminar" onclick="ConfirmarEliminar(${materia.Id})">Eliminar</button></td>


          </tr>`;
      tabla.innerHTML = html;
    }
  });
}
function Agregar(Persona, Materia) {
  EjecutarPeticionServidor(
    "PersonaMaterias",
    "POST",
    {
      Persona_Id: Persona,
      Materia_Id: Materia,
      Notas_Materias_Id: null,
    },
    function (response) {
      if(response.Message){
        swal(
          "¡Transacción Fallida! ",
          "Campos vacíos o verifique que la persona no esté asignada a una materia",
          "error"
        );
      }else{
      swal(
        "¡Transacción Exitosa! ",
        "¡Se ha asignado la materia al docente! ",
        "success"
      );
      consultar(response);
      limpiarDatos();
      nombrePersona.value = "";
      nombreMateria.value = "";
    }
    }
  );
}
function AbrirEditar(Id, persona, Materia) {
  OpenUpdate();
  idMateriaPersona.value = Id;
  personaEditar.value = persona;
  MateriaEditar.value = Materia;
}

function Editar(id, Persona, Materia) {
  EjecutarPeticionServidor(
    "PersonaMaterias/" + id,
    "PUT",
    {
      Id: parseInt(id),
      Persona_Id: Persona,
      Materia_Id: Materia,
    },
    function (data) {
      consultar(data),
        swal(
          "¡Transacción Exitosa! ",
          "¡Se ha editado la asignación! ",
          "success"
        );
    }
  );
  CloseUpdate();
}

function Eliminar(id) {
  EjecutarPeticionServidor(
    "PersonaMaterias/" + id,
    "DELETE",
    null,
    function (data) {
      let tr = document.querySelector(`tr[data-id="${id}"]`);
      tabla.removeChild(tr);
      swal("El docente ha eliminado la asignación correctamente", {
        icon: "success",
      });
    }
  );
}

function ConfirmarEliminar(id) {
  swal({
    title: "¿Esta seguro de eliminar la asignación?",
    text: "No podra recuperar la información de la asignación si lo elimina",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      Eliminar(id);
    } else {
      swal("No se elimino la asignación");
    }
  });
}
function validarRepeticion(idP, idM) {
  console.log("funcion sirve");
  arrayMateria.some(
    (personaMateria) =>
      personaMateria.IdPersona == idP && personaMateria.IdMateria == idM
  ) == true
    ? swal(
        "¡Transacción Fallida! ",
        "-No puedes agregar esta persona porque ya tiene asignada una materia",
        "error"
      )
    : Agregar(idP, idM),
    console.log("siempre se ejectua esto despues del trinario");
}
consultar();
seleccionarPersona(nombrePersona);
seleccionarMateria(nombreMateria);
seleccionarPersona(personaEditar);
seleccionarMateria(MateriaEditar);
boton.addEventListener("click", () => {
  validarRepeticion(nombrePersona.value, nombreMateria.value);
});
btnEditarPersona.addEventListener("click", () => {
  arrayMateria.some(
    (personaMateria) =>
      personaMateria.IdPersona == personaEditar.value &&
      personaMateria.IdMateria == MateriaEditar.value
  ) == true
    ? swal(
        "¡Transacción Fallida! ",
        "-No puedes editar esta persona porque ya tiene esa materia asignada",
        "error"
      )
    : Editar(idMateriaPersona.value, personaEditar.value, MateriaEditar.value);
});
