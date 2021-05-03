//Se obtiene el id de la persona que llega desde la URL
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = parseInt(urlParams.get('id'));
let idnotas =[]
let nombreAlumno = document.getElementById("NombreEstudiante")
let documento = document.getElementById("identificacion")
let tipoDoc = document.getElementById("tipoDocumento")
const tabla = document.querySelector(".TablaReporte");
let promedio=[]

//const urlApi = "http://fercho12345-001-site1.itempurl.com";
const urlApi = "http://localhost:52811";

    function crearTh(texto){
        let th = document.createElement("th");
        th.innerHTML = texto;
        return th;
    }
    function crearTd(texto){
        let td = document.createElement("td");
        td.innerHTML = texto;
        return td;
    }

function listarTodo(id) {
    fetch(urlApi + "/api/periodoes")
      .then((data) => data.json())
      .then((periodos) => {
            listarNotas(id);
            listarThead(periodos);
          }
      );
  }


async function listarNotas(id) {
    await fetch(urlApi+"/api/Personas/"+id)
        .then((data) => data.json())
        .then((notas) => {
            llenarTabla(notas)
        })
        .catch((error) => error);
}
function llenarTabla(notas,periodos) { 
  notas.forEach(n => {
      nombreAlumno.innerHTML = n.nombrePersona;
      documento.innerHTML = n.documento;
      tipoDoc.innerHTML = n.tipoDocumento == 1 ? 'CC':'TI';

  }
  );
  
  for (let j = 0; j < notas.length; j++) {
      promedio = [];
    let tr = document.createElement("tr");
    tr.appendChild(crearTd(notas[j].profe)).setAttribute("id","info");
    tr.appendChild(crearTd(notas[j].nombreMateria)).setAttribute("id","info");
      for (let l = 0; l < notas[j].notasPersona.length; l++) {
          tr.appendChild(crearTd(notas[j].notasPersona[l].nota)).setAttribute("id","infonotas");
          let calculo = (notas[j].notasPersona[l].porcentaje /100) * notas[j].notasPersona[l].nota;
          promedio.push(calculo)
      }
      let resultado=(promedio.reduce(function(a, b){ return a + b; })).toFixed(2);
      
      tr.appendChild(crearTd(resultado))
      
      document.querySelector(".tbodyTabla").appendChild(tr);
}
}

function listarThead (periodos){
    let tr = document.createElement("tr");
  tr.appendChild(crearTh("Nombre Docente"))
  tr.appendChild(crearTh("Materia"))
  document.querySelector(".theadTabla").appendChild(tr);
  for (let i = 0; i < periodos.length; i++) {
    tr.appendChild(crearTh(periodos[i].NombreP+" "+periodos[i].Porcentaje+"%"))
  }
  tr.appendChild(crearTh("Promedio"))
}

listarTodo(id);
function Imprimir(){
    window.print();
}
 // if(notas.length!=0){
    //     notas.forEach((n) => {
    //         if(!idnotas.includes(n.Notas[0].Idnota)){
    //             idnotas.push(n.Notas[0].Idnota);
    //             nombreAlumno.innerHTML = n.nombrePersona;
    //             documento.innerHTML = n.documento;
    //             tipoDoc.innerHTML = n.tipoDocumento == 1 ? 'CC':'TI';

                
    //             html += "<thead> <tr> <th>Nombre del Docente</th> <th>Materia</th> "
    //             for (let index = 0; index < n.Notas.length; index++) {
    //                 html+="<th>"+n.Notas[index].NombreP+"</th>";
    //                 promedio.push((n.Notas[index].Porcentaje /100) * n.Notas[index].Notas )
    //             }
                
    //             html+="<th>Nota Final</th></tr> </thead>"
    //             html+=`<tbody class="tbody">
    //             <tr id="tr" data-id="${n.Id}">
    //                 <td id="info">${n.Profesor[0].Nombres}</td>
    //                 <td id="info">${n.Materia}</td> `
    //             for (let index = 0; index < n.Notas.length; index++) {
                    
    //                 html+=`<td id="infoNotas">${(n.Notas[index]==null||n.Notas[index]==undefined)?"Aún no tiene nota asignada":n.Notas[index].Notas}</td>`
                    
    //             }
    //             let resultado=(promedio.reduce(function(a, b){ return a + b; })).toFixed(2)
    //             html+=`<td id="infoNotas">${resultado} </td>
    //                 </tr>`
    //             tabla.innerHTML = html;
    //         }
            
    //     })}else{
    //         alert("Alumno sin notas");
    //         window.close();
            
    //     }