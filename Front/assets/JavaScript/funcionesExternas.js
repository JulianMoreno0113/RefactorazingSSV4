//modal -------------------------------------------------
console.log("Julian no trabaja")
function limpiarDatos() {
  document.querySelector(".frmEditar").reset();
}


//buscar -------------------------------------------------

(function (document) {
  "use strict";

  var LightTableFilter = (function (Arr) {
    var _input;

    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByClassName(
        _input.getAttribute("data-table")
      );
      Arr.forEach.call(tables, function (table) {
        Arr.forEach.call(table.tBodies, function (tbody) {
          Arr.forEach.call(tbody.rows, _filter);
        });
      });
    }

    function _filter(row) {
      var text = row.textContent.toLowerCase(),
        val = _input.value.toLowerCase();
      row.style.display = text.indexOf(val) === -1 ? "none" : "table-row";
    }

    return {
      init: function () {
        var inputs = document.getElementsByClassName("light-table-filter");
        Arr.forEach.call(inputs, function (input) {
          input.oninput = _onInputEvent;
        });
      },
    };
  })(Array.prototype);

  document.addEventListener("readystatechange", function () {
    if (document.readyState === "complete") {
      LightTableFilter.init();
    }
  });
})(document);

//menu
let botonMenu = document.querySelector(".hamburguesa");
let ver = document.querySelectorAll(".ver");
botonMenu.addEventListener("click", MostrarNav);

function MostrarNav() {
  if (botonMenu) {
    ver.forEach((mostrar) => {
      mostrar.classList.toggle("hidden");
    });
  } else {
    alert("error");
  }
}
//abrir menu responsive
let flechaMenuResponsive = document.querySelector(".abrirSubMenuResponsive");
  flechaMenuResponsive.addEventListener("click",function(){
    let submenu = document.querySelector(".submenu");
    return submenu.style.display == "block"?submenu.style.display = "none": submenu.style.display = "block"
  })
//logica img -------------------------------------------------
let hmtlLocation = window.location.toString();



function logicaImg(){let imagenes = [
  "assets/img/Colegio1.png",
  "assets/img/Colegio2.jpeg",
  "assets/img/Colegio3.jpg",
];
let slide = document.querySelector(".imgIndexSlide");
let botones = document.querySelectorAll(".ContentButtons");
botones[0].style.backgroundColor = "#3A6D8C";

let posicionActual = 0;
function SlideBotones(n) {
  posicionActual = n;
  MostrarImagen();
  ColorearBotones();
}
function AdelantarDatos() {
  posicionActual >= imagenes.length - 1
    ? (posicionActual = 0)
    : posicionActual++;
  MostrarImagen();
  ColorearBotones();
}

function RetrocederDatos() {
  posicionActual <= 0
    ? (posicionActual = imagenes.length - 1)
    : posicionActual--;
  MostrarImagen();
  ColorearBotones();
}
function MostrarImagen() {
  slide.src = `${imagenes[posicionActual]}`;
}
function ColorearBotones() {
  for (let i = 0; i < botones.length; i++) {
    if (i == posicionActual) {
      botones[posicionActual].style.backgroundColor = "#3A6D8C";
    } else {
      botones[i].style.backgroundColor = "#F2F2F2";
    }
  }
}
}



