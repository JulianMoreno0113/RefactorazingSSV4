import * as inputs from "../formulariosCrud/inputs.js";
import * as tablas from "../tablas/tablas.js"

export const crearEnlaces = function({texto,icono}){
    const a = document.createElement('a');
    // a.href = ruta;
    const li = document.createElement('li');

    
    const img = document.createElement('img');
    img.setAttribute('src','assets/icons/'+icono);

    a.append(img);
    a.append(texto);

    li.append(a);
    switch (texto) {
			case "Docentes":
			case "Alumnos":
				li.id = texto;
				li.dataset.elementos = JSON.stringify([
					"nombre",
					"apellido",
					"numeroDoc",
					"tipoDoc"
				]);
				break;
			case "Materias":
				li.id = texto;
				CrearSubMenuMaterias(li);
				li.dataset.elementos = JSON.stringify(["nombre"]);
				break;
			case "Periodos":
				li.id = texto;
				li.dataset.elementos = JSON.stringify(["nombre", "porcentaje"]);
				break;
		}
    li.addEventListener("click", () =>
    {
      const objeto = JSON.parse(li.dataset.elementos)
			inputs.crearInputsFormularios(objeto)
      tablas.crearTablasFormularios(texto)
    });
        

    return li;
}

function CrearSubMenuMaterias(liPapa){

        const abrirSubMenuResponsive = document.createElement('span');
        abrirSubMenuResponsive.classList.add("abrirSubMenuResponsive");
        liPapa.append(abrirSubMenuResponsive)

        const flechaAbrirMenuResponsive = document.createElement('img');
        flechaAbrirMenuResponsive.classList.add("flechaAbrirMenuResponsive");
        flechaAbrirMenuResponsive.src = "assets/icons/caret-down.svg";
        abrirSubMenuResponsive.append(flechaAbrirMenuResponsive);

        const submenu = document.createElement('ul');
        submenu.classList.add("submenu");
        liPapa.append(submenu)

        const liMateriaAlumno = document.createElement("li");
        const aMateriaAlumno = document.createElement("a");
        aMateriaAlumno.href = "views/asignar_materia_alumno.html";
        aMateriaAlumno.append("Alumno");
        liMateriaAlumno.append(aMateriaAlumno);
        submenu.append(liMateriaAlumno);

        const liMateriaProfesor = document.createElement("li");
        const aMateriaProfesor = document.createElement("a");
        aMateriaProfesor.href = "views/asignar_materia_profesor.html";
        aMateriaProfesor.append("Profesor");
        liMateriaProfesor.append(aMateriaProfesor);
        submenu.append(liMateriaProfesor);

}