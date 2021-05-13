export const crearTablasFormularios = function(elementos){
     const seccionTabla = document.createElement("section")
     seccionTabla.classList.add("seccionTabla")

     const encabezado = document.createElement("div")
     encabezado.classList.add("encabezadoTabla")
     seccionTabla.append(encabezado)

     const tituloTabla = document.createElement("h1")
     tituloTabla.classList.add("tituloTabla")
     tituloTabla.innerText("Gestionar Periodos")
     seccionTabla.append(tituloTabla)

     const div = document.createElement("div")
     seccionTabla.append(div)

     const inputTabla = document.createElement("input")
     inputTabla.classList.add("form-control","col-md-6","light-table-filter")
     inputTabla.setAttribute("data-table","order-table")
     inputTabla.type("text")
     inputTabla.placeholder("Buscar...")
     inputTabla.id("BuscarId")
     seccionTabla.append(inputTabla)
}