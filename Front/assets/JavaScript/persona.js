const boton = document.getElementById("btnAgregar");
const btnGuardarMateria = document.getElementById("btnEditar");

let inputNombre = document.getElementById("nombre");
let inputApellido = document.getElementById("apellido");
let inputDocumento = document.getElementById("documento");
let inputTipo = document.getElementById("tipoId");
let inputId = document.getElementById("idMaestro");

let documentoEditar = document.getElementById("documentoEditar");
let nombreEditar = document.getElementById("nombreEditar");
let apellidoEditar = document.getElementById("apellidoEditar");
let tipoIdEditar = document.getElementById("tipoIdEditar");
let estadoEditar = document.getElementById("estadoEditar");
let htmlLocation = window.location;

const urlHost = "http://127.0.0.1:5500";

export function listarPersona(tbody,tipoPersona) {
  EjecutarPeticionServidor(
    "Personas/ConsultarTodo",
    "GET",
    null,
    function (personas) {
      personas.forEach((persona) => {
        if (
          persona.Tp_Id == 1 &&
          tipoPersona ==1 
        ) {
          llenarTablaPersona(persona,tbody);
        } else if (
          persona.Tp_Id == 2 &&
          tipoPersona ==2 
        ) {
          llenarTablaPersona(persona,tbody);
        }
      });
    }
  );
}

function llenarTablaPersona(p,tabla) {
  let profe = document.createElement("tr");
  profe.innerHTML += `<td> ${p.NDoc} </td>
  <td>  ${p.Nombres} </td>
  <td>  ${p.Apellidos} </td>
  <td>  ${p.TDoc_Id == 1 ? "CC" : "TI"}  </td>
  <td >  ${p.Activo ? "Activo" : "Inactivo"}  </td>`;
	profe.innerHTML += `<td class="tdBoton ">
  <button class="buttonEditar"onclick="AbrirEditar
	(${p.Id},
	${p.NDoc},
	'${p.Nombres}',
    '${p.Apellidos}',
    ${p.TDoc_Id},
	${p.Activo}
	)">Editar</button>
  <button class="buttonEliminar" onclick="ConfirmarEliminar(${p.Id})">Eliminar</button></td>`;
  profe.setAttribute("data-id", p.Id);
  tabla.appendChild(profe);
}

function Capitalize(name) {
  return name
    ? name[0].toUpperCase() + name.slice(1)
    : console.log("esta vacio");
}

function Agregar(nombre, apellido, tdoc, ndoc) {
  EjecutarPeticionServidor(
    "Personas",
    "POST",
    {
      Nombres: Capitalize(nombre),
      Apellidos: Capitalize(apellido),
      TDoc_Id: tdoc,
      NDoc: ndoc,
      Activo: true,
      Tp_Id: htmlLocation == urlHost + "/views/alumnos.html" ? 1 : 2,
    },
    function (response) {
      if (response.Message) {
        swal(
          "??Transaccion Fallida! ",
          "-Error el documento esta repetido \n -Campos Vacios",
          "error"
        );
      } else {
        swal(
          "??Transaccion Exitosa! ",
          "??Se ha agregado un nuevo alumno! ",
          "success"
        );
        llenarTablaPersona(response);
      }
    }
  );
}

function AbrirEditar(id, nDoc, nombres, apellidos, tDoc, estado) {
  OpenUpdate();
  documentoEditar.value = nDoc;
  nombreEditar.value = nombres;
  apellidoEditar.value = apellidos;
  tipoIdEditar.value = tDoc;
  estadoEditar.value = estado;
  // btnGuardarMateria.addEventListener("click", () => {
  //   Editar(
  //     id,
  //     documentoEditar.value,
  //     nombreEditar.value,
  //     apellidoEditar.value,
  //     tipoIdEditar.value,
  //     estadoEditar.value
  //   );
  // });
}

function Editar(id, nDoc, nombres, apellidos, tDoc, estado) {
  if (
    nombre == "" ||
    apellidos == "" ||
    tDoc == "" ||
    nDoc == "" ||
    estado == ""
  ) {
    swal("??Transaccion Fallida! ", "Diligencie todos los campos", "error");
  } else {
    EjecutarPeticionServidor(
      "Personas/" + id,
      "PUT",
      {
        Id: id,
        Nombres: nombres,
        Apellidos: apellidos,
        Tdoc_Id: parseInt(tDoc),
        NDoc: nDoc,
        Activo: estado == "1" ? true : false,

        Tp_Id: htmlLocation == urlHost + "/views/alumnos.html" ? 1 : 2,
      },
      function (response) {
        let tr = document.querySelector(`tr[data-id="${id}"]`);

        tr.innerHTML = `<td> ${nDoc} </td>
					  <td>  ${nombres} </td>
					  <td>  ${apellidos} </td>
					  <td>  ${tDoc == 1 ? "CC" : "TI"}  </td>
					  <td>  ${estado == "1" ? "Activo" : "Inactivo"}  </td>
					  <td class="tdBoton ">
					  <button class="buttonEditar" onclick="AbrirEditar
						  (${id},
						  ${nDoc},
						  '${nombres}',
						  '${apellidos}',
						  ${tDoc},
						  ${estado}
						  )">Editar</button>
					  <button class=" buttonEliminar" onclick="ConfirmarEliminar(${id})">Eliminar</button></td>`;
      }
    );
    swal(
      "??Transaccion Exitosa! ",
      "??Se ha agregado un nuevo alumno! ",
      "success"
    );

    CloseUpdate();
  }
}

function Eliminar(id) {
  EjecutarPeticionServidor("Personas/"+id, "DELETE", null, function (response) {
	console.log(response)
    if (response.Message) {
      swal("??Transaccion Fallida! ", response.Message , "error");
    } else {
	 swal("La persona ha sido eliminado correctamente", {
			icon: "success",
		  });
      let tr = document.querySelector(`tr[data-id="${id}"]`);
      tabla.removeChild(tr);
    }
  });
}

function ConfirmarEliminar(id) {
  swal({
    title: "Esta seguro de eliminar esta persona?",
    text:
      "No podra recuperar la informaci??n de esta persona si lo elimina y por favor verifique que la persona no tenga una materia asiganda",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      Eliminar(id);
    } else {
      swal("No se elimino la persona");
    }
  });
}
// listarPersona();
