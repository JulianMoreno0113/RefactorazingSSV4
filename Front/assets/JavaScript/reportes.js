const tabla = document.querySelector(".tbody");

export function listarAlumno(tbody) {
	EjecutarPeticionServidor("Personas/ConsultarTodo","GET",null,function(personas){
		personas.forEach((persona) => {
			if (persona.Tp_Id == 1) {
				llenarTabla(persona,tbody);
			}
		})
	})
}

function llenarTabla(p,tabla) {
	let alumno = document.createElement("tr");
	alumno.innerHTML += `<td>  ${p.Nombres} ${p.Apellidos}</td>
     <td> ${p.NDoc} </td>`;
	alumno.innerHTML += `<td class="tdBoton ">
	 <button class="fas fa-trash-alt buttonVerReporte" onclick="AbrirReporte(${p.Id})">Ver reporte</button></td>`;
	alumno.setAttribute("data-id", p.Id);
	tabla.appendChild(alumno);
	console.clear();
}

export function AbrirReporte(id) {
	window.open("reporte.html?id=" + id, "_blank");
}
listarAlumno();