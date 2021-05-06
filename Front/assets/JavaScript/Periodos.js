const tabla = document.querySelector(".tbody");
const botonAgg = document.getElementById("btnAgregar");
const inputNombre = document.getElementById("nombre");
const inputId = document.getElementById("idPeriodo");
const nombreEditar = document.getElementById("nombreEditar");
const btnGuardarPeriodo = document.getElementById("btnEditar");
const porcentajePeriodo = document.getElementById("porcentaje")
const porcentajeEditar=document.getElementById("porcentajeEditar");
const porcentajePeriodoNota = document.getElementById("porcentajePeriodoNota")
const iconoPorcentajePeriodoNota = document.querySelector(`#porcentajePeriodoNota i`)
let otrosPorcentajes = []
let totalArregloPorcentaje=0;
let valorPorcentajeTemp = 0;
const urlHost = "http://localhost:52811"
//const urlApi = "https://localhost:44351";

botonAgg.addEventListener("click", () => {
	if(inputNombre.value == "" 
	|| inputNombre.value == null || inputNombre.value == undefined || parseInt(porcentaje.value) <=0
	|| porcentaje.value == null || porcentaje.value == undefined){
	swal(
        "¡Transacción Fallida! ",
        "-Error el porcentaje es incorrecto \n -Campos Vacíos",
        "error"
    );}else
	{Agregar(inputNombre.value,porcentaje.value)};
});


function ListarPeriodo() {
	EjecutarPeticionServidor("Periodoes","GET",null,function(periodos){
		periodos.forEach((periodo) => {
			LlenarTabla(periodo);
		})
	})
}

function LlenarTabla(m) {
	let nMateria = document.createElement("tr");

	nMateria.innerHTML += `<td>${m.NombreP} </td>
	<td>${m.Porcentaje}% </td>`;
	otrosPorcentajes.push(m.Porcentaje)
	totalArregloPorcentaje=otrosPorcentajes.reduce(function(a, b){ return a + b; })
	nMateria.setAttribute("data-id", m.Id);
	nMateria.innerHTML += `<td class="tdBoton "><button class="buttonEditar "onclick="AbrirEditar(${m.Id},'${m.NombreP}',${m.Porcentaje})">Editar</button>
    <button class=" buttonEliminar" onclick="ConfirmarEliminar(${m.Id})">Eliminar</button></td>`;
	tabla.appendChild(nMateria);
	inputNombre.value = "";
}

function Agregar(nombre,porcentaje) {
	EjecutarPeticionServidor("Periodoes","POST",{
		NombreP: nombre,
		Porcentaje: porcentaje
	},function (datos){
		swal("El periodo ha sido agregado correctamente", {
			icon: "success",
		  })
		LlenarTabla(datos)
	} 
	)
	
}

function AbrirEditar(id, nombre,porcentaje) {
	OpenUpdate();
	inputId.value = id;
	nombreEditar.value = nombre;
	porcentajeEditar.value=porcentaje
	valorPorcentajeTemp = porcentaje;
}

function Editar(id, nombre,porcentaje) {
	EjecutarPeticionServidor("Periodoes/"+id,"PUT",{
		Id: parseInt(id),
		NombreP: nombre,
		Porcentaje: parseFloat(porcentaje)
	},function(data){
		let tr = document.querySelector(`tr[data-id="${id}"]`);
		tr.innerHTML = `<td>${nombre}</td><td>${porcentaje}%</td><td class="tdBoton "><button class="buttonEditar"onclick="AbrirEditar(${id},'${nombre}','${porcentaje}')">Editar</button>
    <button class=" buttonEliminar" onclick="Eliminar(${id})">Eliminar</button></td>`;
	})
	limpiarDatos(),
	CloseUpdate();		
}

function Eliminar(id) {
	EjecutarPeticionServidor("Periodoes/"+id,"DELETE",null,function(){
		let tr = document.querySelector(`tr[data-id="${id}"]`);
		tabla.removeChild(tr);
		inputId.value = "";
		inputNombre.value = "";
	})
}

function Delete(url, callback){
	fetch(urlApi+url, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "DELETE",
	}).then((response) => {
		callback(response);
	});
}

function ConfirmarEliminar(id){
	swal({
		title: "Esta seguro de eliminar esta periodo?",
		text: "No podra recuperar la información de esta persona si lo elimina y por favor verifique que no existan notas asiganadas a este periodo",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			Eliminar(id);
		  swal("El periodo ha sido eliminado correctamente", {
			icon: "success",
		  });
		} else {
		  swal("No se eliminó el periodo");
		}
	  });
}

porcentajeEditar.addEventListener("keyup",()=>{
	if((totalArregloPorcentaje-valorPorcentajeTemp)+parseInt(porcentajeEditar.value)<101 || parseInt(porcentaje.value) < 0){
		porcentajeEditar.style.border = "2px solid green"
		btnGuardarPeriodo.disabled = false;
		btnGuardarPeriodo.style.backgroundColor="#023859"
	}else{
		porcentajeEditar.style.border = "2px solid red"
		btnGuardarPeriodo.disabled = true;
		btnGuardarPeriodo.style.backgroundColor="#658294"
	}
})

btnGuardarPeriodo.addEventListener("click", (e) => {
		Editar(inputId.value, nombreEditar.value,porcentajeEditar.value);
		swal("Transacción Exitosa","El periodo fue editado correctamente", {
			icon: "success",
		})
})


porcentajePeriodo.addEventListener("keyup",()=>{validarPorcentaje(porcentajePeriodo)})

function validarPorcentaje(porcentajePeriodo){
	console.log(porcentajePeriodo)
  if (parseFloat(porcentajePeriodo.value) + totalArregloPorcentaje<101){
    porcentajePeriodoNota.classList.add("formulario__grupo-correcto");
    porcentajePeriodoNota.classList.remove("formulario__grupo-incorrecto");
    iconoPorcentajePeriodoNota.classList.add('fa-check-circle');
    iconoPorcentajePeriodoNota.classList.remove('fa-times-circle');
    botonAgg.disabled=false;
    botonAgg.style.backgroundColor="#023859"
  }else{
   porcentajePeriodoNota.classList.add("formulario__grupo-incorrecto");
   porcentajePeriodoNota.classList.remove("formulario__grupo-correcto");
   porcentajePeriodoNota.classList.add('fa-times-circle');
   iconoPorcentajePeriodoNota.classList.remove('fa-check-circle'); 
   botonAgg.disabled=true;
   botonAgg.style.backgroundColor="#658294"
   
  }
}

ListarPeriodo();
