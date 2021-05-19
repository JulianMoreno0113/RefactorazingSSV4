import * as inputs from "../formulariosCrud/inputs.js";
import * as tablas from "../tablas/tablas.js";
import {listarThead} from "../../assets/JavaScript/Notas.js";
import * as validaciones from "../../assets/JavaScript/validaciones.js";

export const crearEnlaces = function ({ texto, cargar, icono, data, submenus }) {
  const li = s5("<li>");
  const img = s5("<img>", { src: "assets/icons/" + icono });

  li.insert(img);
  li.append(texto);


   if(submenus?.length >0)
    {  
      const submenu = s5("<ul>",{class: "submenu"}).insertTo(li);
      submenus.forEach(function(menu){
        CrearLi(submenu,menu.texto)
      })
      
    }
     
  li.addEvent("click", () => {
    if(texto=="Notas"){
      document.querySelector(".seccionTabla").innerHTML = '';
      document.querySelector(".seccionFormulario").innerHTML = '';
      tablas.tablaNotas();
    }else{ 
      inputs.crearInputsFormularios(data, texto);
      tablas.crearTablasFormularios(texto, data, cargar);
      validaciones.ejemplo()
    }
   
  });
  
  return li;
};

function CrearLi(ulPapa, texto){
  const liMateriaAlumno = s5("<li>").insertTo(ulPapa);
  liMateriaAlumno.append(texto);
}

function CrearSubMenuMaterias(liPapa, texto) {
  const abrirSubMenuResponsive = s5("<span>", {
    class: "abrirSubMenuResponsive",
  })
    .insert(
      s5("<img>", {
        class: "flechaAbrirMenuResponsive",
        src: "assets/icons/caret-down.svg",
      })
    )
    .insertTo(liPapa);

  const submenu = s5("<ul>",{class: "submenu"}).insertTo(liPapa);

  const liMateriaAlumno = s5("<li>");
  liMateriaAlumno.append("Alumno");

  const liMateriaProfesor = s5("<li>");
  liMateriaProfesor.append("Profesor");
  submenu.insert([ liMateriaAlumno , liMateriaProfesor ]);


  
}