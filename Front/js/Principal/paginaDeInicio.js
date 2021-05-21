

export const PaginaDeInicio = ()=>{

    const contenedorSection = document.querySelector(".contenedorSection");
    contenedorSection.innerHTML = "";

    const divTitulo = document.createElement('div');
    divTitulo.classList.add('titulo');
    contenedorSection.append(divTitulo);

    const h1Titulo = document.createElement('h1');
    h1Titulo.innerText="COLEGIO GRANDE";
    divTitulo.append(h1Titulo);

    const sectionSlideImg = document.createElement('section');
    sectionSlideImg.classList.add('slideimg','ver','hidden');
    contenedorSection.append(sectionSlideImg);

    const imgIndexSlide = document.createElement('img');
    imgIndexSlide.src = "assets/img/Colegio1.png";
    imgIndexSlide.classList.add('imgIndexSlide');
    imgIndexSlide.alt = "Imagenes del colegio";
    sectionSlideImg.append(imgIndexSlide);

    const divCambiarImagen = document.createElement('div');
    divCambiarImagen.classList.add("cambiarImagen");
    sectionSlideImg.append(divCambiarImagen);

    const iconBack = document.createElement('img');
    iconBack.src = "assets/icons/back.svg";
    iconBack.alt = "icon back";
    iconBack.classList.add('icons','back');
    iconBack.addEventListener('click',RetrocederDatos)
    divCambiarImagen.append(iconBack);

    const iconNext = document.createElement('img');
    iconNext.src = "assets/icons/next.svg";
    iconNext.alt = "icon next";
    iconNext.classList.add('icons','next');
    iconNext.addEventListener('click',AdelantarDatos)
    divCambiarImagen.append(iconNext);

    const divBotonesImagen = document.createElement('div');
    divBotonesImagen.classList.add("botonesImagen");
    sectionSlideImg.append(divBotonesImagen);
    
    for (let i = 0; i < 3; i++) {
        const botonContentButtons = document.createElement('button');
        i == 0 ? botonContentButtons.style.backgroundColor = "#3A6D8C": botonContentButtons.style.backgroundColor = "#F2F2F2";
        botonContentButtons.classList.add("ContentButtons");
        botonContentButtons.addEventListener('click',()=>SlideBotones(i))
        divBotonesImagen.append(botonContentButtons)
    }


    const sectionRedesSociales = document.createElement('section');
    sectionRedesSociales.classList.add('RedesSociales','ver','hidden');
    contenedorSection.append(sectionRedesSociales);

    const listasRedesSociales =[
        {nombre:"twitter",href:"https://twitter.com/home?lang=es",src:"assets/icons/Twitter-icon-azul.svg",titulo:"@ColegioGrande"},
        {nombre:"facebook",href:"https://www.facebook.com/",src:"assets/icons/Facebook-icon-azul.svg",titulo:"ColegioGrande"},
        {nombre:"gmail",href:"https://www.gmail.com/",src:"assets/icons/Gmail-icon-azul.svg",titulo:"colegiogrande@colegio.edu.co"},
        {nombre:"instagram",href:"https://www.instagram.com/",src:"assets/icons/instagram-icon.svg",titulo:"@colegio"}
    ]

    const htmlListas = listasRedesSociales.map(CrearRedesSociales);

    const agregarAl = padre => (el)=> padre.append(el);
    const agregarAlSection = agregarAl(sectionRedesSociales);

    htmlListas.forEach(agregarAlSection);

}

function CrearRedesSociales({nombre,href,src,titulo}){
    const divRedSocial = document.createElement('div');
    divRedSocial.classList.add(nombre, 'ver','hidden');

    const aRedSocial = document.createElement('a');
    aRedSocial.target = "_black";
    aRedSocial.href =href;
    divRedSocial.append(aRedSocial);

    const aBotonRedSocial = document.createElement('button');
    aRedSocial.append(aBotonRedSocial);

    const imgRedSocial = document.createElement('img');
    imgRedSocial.src = src;
    imgRedSocial.alt = "Icono "+nombre;
    imgRedSocial.id = nombre+"-icon";
    aBotonRedSocial.append(imgRedSocial);

    const h2TituloRedSocial = document.createElement('h2')
    h2TituloRedSocial.innerHTML = titulo;
    divRedSocial.append(h2TituloRedSocial);
    
    return divRedSocial;
}

let imagenes = [
    "assets/img/Colegio1.png",
    "assets/img/Colegio2.jpg",
    "assets/img/Colegio3.jpg",
  ];


  
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
    let slide = document.querySelector(".imgIndexSlide");
    slide.src = `${imagenes[posicionActual]}`;
  }
  function ColorearBotones() {
    let botones = document.querySelectorAll(".ContentButtons");

    for (let i = 0; i < botones.length; i++) {
      if (i == posicionActual) {
        botones[posicionActual].style.backgroundColor = "#3A6D8C";
      } else {
        botones[i].style.backgroundColor = "#F2F2F2";
      }
    }
}
