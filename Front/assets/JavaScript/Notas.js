const tabla = document.querySelector(".tbodyNotas");

const inputnota = document.getElementById("nota");
const nombreEditar = document.getElementById("nombreEditar");
const materiaEditar = document.getElementById("materiaEditar");
const EditarNota = document.getElementById("EditarNota");
const periodoeditar = document.getElementById("seleccionPeriodo");
const btnEditar = document.getElementById("ButtonEditar");
let arrayperiodos=[];
let habilitar=false;



export function listarThead(url) {
  EjecutarPeticionServidor(url,"GET",null,function(periodos){
    theadperiodos(periodos);
    listarNotas(periodos);
  })

  }



export async function listarNotas(arrayperiodos) {
  await EjecutarPeticionServidor("Personas/alumnos/materias/notas","GET",null,function(notas){
    llenarTabla(notas, arrayperiodos); 
})   
}

function theadperiodos(periodos) {
  let thead = document.querySelector(".theadNotas");
  thead.innerHTML = "";
  function crearTh(texto) {
    let td = document.createElement("th");
    td.innerHTML=texto;
    return td;
  }
  let tr = document.createElement("tr");
  tr.appendChild(crearTh("Nombre del Estudiante"))
  tr.appendChild(crearTh("Materia"))
    periodos.forEach(periodo => tr.appendChild(crearTh(periodo.NombreP+" "+periodo.Porcentaje+"%")))
   tr.appendChild(crearTh("Acción"));
  thead.appendChild(tr);	
}


function llenarArrayNotas(datos){
  
  datos.forEach((nota) => arrayTodasLasNotas.push(nota.Notas));

}
function validarArray(array, nuevo){
  let elementoEncontrado = array.find(function(item){
      return item.idPM == nuevo.idPM && item.idPeriodo == nuevo.idPeriodo
  })
  if(!!elementoEncontrado){
      elementoEncontrado.nota = nuevo.nota
  }else{
      array.push(nuevo)
  }
  return array;
}
function llenarTabla(notas, periodos) {
  function crearTd(texto) {
    let td = document.createElement("td");
    td.innerHTML=texto;
    return td;
  }
  
let tbody = document.querySelector(".tbodyNotas")
tbody.innerHTML ="";
   for (let i = 0; i < notas.length; i++) {
      let tr = document.createElement("tr");
      tr.setAttribute("data-id",notas[i].idPM);
      tr.appendChild(crearTd(notas[i].nombrePersona));
      tr.appendChild(crearTd(notas[i].nombreMateria));
        for (let j = 0; j < periodos.length; j++) {
              let idPeriodo = periodos[j].Id;
              let notaPintar= notas[i].notasPersona[j]?.nota;
              let idnota= notas[i].notasPersona[j]?.idnota;
              let idPM= notas[i].idPM;
              let nota =notaPintar==undefined || notaPintar==null?"":notaPintar;
              let td_nota = crearTd("");
              let input_nota = document.createElement("input");
              input_nota.setAttribute("type","number");
              input_nota.setAttribute("class", "inputNota");
              input_nota.value = nota;
              input_nota.addEventListener('keyup',function() {

                if(this.value<0||this.value >100){
                  this.style.border='3px solid #bb2929'
                  habilitar=false
                }else{
                  this.style.border='3px solid #1ed12d'
                  habilitar=true
                }

                if(this.value != nota){
                  let cambiosActuales = JSON.parse(botonEditar.dataset.changes) ;
                  validarArray(cambiosActuales, {idNota: idnota, nota: this.value, idPM: idPM, idPeriodo: idPeriodo}); 
                  botonEditar.dataset.changes = JSON.stringify(cambiosActuales);
                  botonEditar.disabled = false; 

                }
              })

              td_nota.appendChild(input_nota);
              tr.appendChild(td_nota);
            }  
            tbody.appendChild(tr);
       let botonEditar=document.createElement("button");
       botonEditar.dataset.changes=JSON.stringify([]);
       botonEditar.classList.add("buttonEditar");
       botonEditar.innerHTML = "Guardar";
       botonEditar.disabled=true;
       botonEditar.addEventListener('click',function(){
         if (habilitar){
          let cambios = JSON.parse(this.dataset.changes);
          cambios.forEach(function(item){
           if(!!item.idNota){
             Editar(item);
             botonEditar.disabled=true;
           }else{
             Agregar(item);
           }
          })
         }else{
           alertify.error("Rellene los datos correctamente")
         }
        
            
       });

       let acciones = crearTd("");
       acciones.appendChild(botonEditar)
      tr.appendChild(acciones)

   }
  
  
}

function Agregar(item) {
  EjecutarPeticionServidor("NotasMaterias","POST",{  Notas: item.nota,
    PersonaMateriaId: parseInt(item.idPM),
    Periodo_id: parseInt(item.idPeriodo)},function(){
      alertify.success('Nota agregada con éxito')
    })
}

function Editar(item) {
  EjecutarPeticionServidor("NotasMaterias/"+ item.idNota,"PUT",{ Id: parseInt(item.idNota),
    Notas: item.nota,
    PersonaMateriaId: parseInt(item.idPM),
    Periodo_id: parseInt(item.idPeriodo)},function(){
      alertify.success('Nota agregada con éxito')
    })
}

listarThead("Periodoes");



