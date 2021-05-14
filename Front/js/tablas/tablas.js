
export const crearTablasFormularios = await function(texto,objeto, cargar){
     
     const seccionTabla = document.createElement("section")
     seccionTabla.classList.add("seccionTabla")

     const encabezado = document.createElement("div")
     encabezado.classList.add("encabezadoTabla")
     seccionTabla.append(encabezado)

     const tituloTabla = document.createElement("h1")
     tituloTabla.classList.add("tituloTabla")
     tituloTabla.innerText="Gestionar "+ texto ;
     encabezado.append(tituloTabla)

     const div = document.createElement("div")
     encabezado.append(div)

     const inputTabla = document.createElement("input")
     inputTabla.classList.add("form-control","col-md-6","light-table-filter")
     inputTabla.setAttribute("data-table","order-table")
     inputTabla.type="text"
     inputTabla.placeholder="Buscar...";
     inputTabla.id="BuscarId"
     div.append(inputTabla)
     const tabla = document.createElement("table");
     tabla.classList.add("tablaAlumnos")
     const thead= document.createElement("thead");
     const tr = document.createElement("tr")
     tabla.append(thead)

     for (let index = 0; index < objeto.length; index++) {
          let th = document.createElement("th");
          th.innerText=objeto[index];
          tr.append(th)
          thead.append(tr);
     }
     const thAcciones= document.createElement("th");
     thAcciones.innerText="Acciones"
     tr.append(thAcciones);

     const tbody=document.createElement("tbody");
     tbody.classList.add("tbody");
     tabla.append(tbody)
     cargar(tbody);

     
     seccionTabla.append(tabla)
     document.querySelector(".contenedorSection").append(seccionTabla);
     
}