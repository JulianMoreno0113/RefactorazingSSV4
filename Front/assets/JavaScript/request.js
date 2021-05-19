/*Links para el uso de la API*/
// const urlApi = "http://fercho12345-001-site1.itempurl.com";
const urlApi = "http://julian12345-001-site1.ctempurl.com";


function EjecutarPeticionServidor(
  rutaControlador,
  metodo,
  cuerpoPeticion,
  callback
) {
  let requestInit = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: metodo,
  };
  if (cuerpoPeticion) {
    requestInit.body = JSON.stringify(cuerpoPeticion);
  }

  fetch(urlApi + "/api/" + rutaControlador, requestInit)
    .then((response) => (response.status == 204 ? null : response.json()))
    .then((data) => {
      callback.call(window, data);
    });
}

