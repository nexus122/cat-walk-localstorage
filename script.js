// Estado de la APP
let moveCat = false;
let pixelsMove = 10;
let volume = 0.5
let walkForwards = true;


// Configuracion del Dom
let btnMove = document.querySelector('#bailar');
let btnStop = document.querySelector('#parar');

// Variables globales
const img = document.querySelector('img');
img.style.left = '0px';

// Música!
const audio = new Audio('./lambada.mp3');
audio.volume = volume;

// escuchar evento submit de formulario
document.querySelector("form").addEventListener('submit', procesarValoresFormulario);
document.querySelector('#velocidad').addEventListener('input', procesarValoresFormulario);
document.querySelector('#volumen').addEventListener('input', procesarValoresFormulario);
// Gestionar localStorage y sobrescribir variables de estado.
/* Recuperamos moveCat */
if(localStorage.moveCat){
    moveCat = JSON.parse(localStorage.moveCat);
    if(moveCat){
        btnMove.disabled = true;
        btnStop.disabled = false;
        audio.play();
    }else{
        btnStop.disabled = true;
        btnMove.disabled = false;
    }
}

/* Recuperamos pixelsMove */
if(localStorage.pixelsMove){
    pixelsMove = JSON.parse(localStorage.pixelsMove);
    document.forms["catConf"].elements["velocidad"].value = pixelsMove;
}

/* Recuperamos el volumen */
if(localStorage.volume){
    volume = JSON.parse(localStorage.volume);
    console.log('Recuperamos el volumen: ', volume);
    document.forms['catConf'].elements['volumen'].value = volume;
}

// evento click al botón Bailar!
// Ejercicio 1

// 1. Asociar el evento "click" al botón "Bailar"
// 2. Actualizar la variable de estado 'moveCat' a true
// 3. Ejecutar el método .play del objeto 'audio'

// Metodo para empezar a bailar y empezar la musica.
btnMove.addEventListener('click',function(){    
    btnMove.disabled = true;
    btnStop.disabled = false;
    moveCat = true;
    localStorage.moveCat = moveCat
    audio.play();
})


// evento click al botón Parar!
// Ejercicio 1

// 1. Asociar el evento "click" al botón "Parar"
// 2. Actualizar la variable de estado 'moveCat' a false
// 3. Ejecutar el método .pause del objeto 'audio'


// Metodo para parar de bailar y parar la musica.
btnStop.addEventListener('click', function(){
    btnStop.disabled = true;
    btnMove.disabled = false;
    moveCat = false;
    localStorage.moveCat = moveCat

    audio.pause();
    audio.currentTime = 0;
})


function catWalk() {

    let currentLeft = parseInt(img.style.left);

    if (walkForwards && (currentLeft > (window.innerWidth - img.width))) {
        walkForwards = false;
        img.style.transform = "rotateY(180deg)";
    }
    if (!walkForwards && (currentLeft <= 0)) {
        walkForwards = true;
        img.style.transform = "";
    }

    // Ejercicio 4

    if (walkForwards) {
        img.style.left = (currentLeft + pixelsMove) + 'px';
    } else {
        img.style.left = (currentLeft - pixelsMove) + 'px';
    }
}


function procesarValoresFormulario(event) {

    // no 'recargues' la página
    event.preventDefault();

    // acceder al input que tiene el name="velocidad"
    const velocidad = document.forms["catConf"].elements["velocidad"].value;
    console.log(parseInt(velocidad));
    pixelsMove = parseInt(velocidad);
    
    // Ejercicio 4
    localStorage.pixelsMove = parseInt(pixelsMove);

    // Ejercicio 5
    const volumen = parseFloat(document.forms['catConf'].elements['volumen'].value);
    console.log(volumen);
    localStorage.volume = volumen;
    audio.volume = volumen;

}


setInterval(function () {
    // Ejercicio 1: Comprobar una variable de estado aquí y hacer un return inmediatamente sería una buena opción; si dicha variable nos dice que el gato no debe moverse.

    if (!moveCat) {
        return;
    }

    catWalk();
}, 50);