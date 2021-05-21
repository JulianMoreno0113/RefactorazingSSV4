//abrirModalActualización
export function OpenUpdate() {
    let modal = document.querySelector(".modalUpdate");
  
    modal.style.display = "block";
  }

  export function CloseUpdate() {
    let modal = document.querySelector(".modalUpdate");
    modal.style.display = "none";
  }