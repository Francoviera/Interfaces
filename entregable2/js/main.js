document.addEventListener("DOMContentLoaded", ()=>{

    let canvas= document.getElementById("canvas");
    let ctx= canvas.getContext('2d');

    let turno= document.getElementById("turno");
    let btnCargar= document.getElementById("btnCargar");


    //cuando se hace click en el boton cargar juego se oculta el div formulario y se muestra el div tablero,  se crea la clase juego cpn sus respectivos parametros,
    //se crean los addEventListener para que el juego pueda funcionar y mover la ficha
    btnCargar.addEventListener("click", (e) => {
        e.preventDefault();
        let team1= document.getElementById("team1").value;
        let team2= document.getElementById("team2").value;
        let filas= document.getElementById("filas").value;
        let columnas= document.getElementById("columnas").value;
        if(team1 && team2 && filas && columnas){
            if(filas > 3 && filas < 9 && columnas > 3 && columnas < 9){
                document.getElementById("formulario").classList.toggle("ocultar");
                document.getElementById("juego").classList.toggle("ocultar");
                
                let juego = new Juego(ctx, 1400, 1000, turno, team1, team2, filas, columnas);
                juego.draw();
                
                //cual el usuario elije la ficha se ejecuta este addEventListener
                canvas.addEventListener('mousedown', (eMouseDown) =>{
                    //si el usuario hizo click en una ficha entra al if
                    if(juego.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)){
                        //si el usuario mantiene click y mueve la ficha este addEventListener ejecuta la funcion de la clase juego handleDrag con la posicion x e y
                        canvas.addEventListener('mousemove', (eMouseMove) => {
                            juego.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY);
                        });
                        
                    }
                })
                //cuando el usuario deja de mantener click se remueve el addEventListener mousemove y se ejecuta la funcion stopDragging de la clase juego
                canvas.addEventListener('mouseup', (eMouseUp) => {
                    canvas.removeEventListener('mousemove', juego.handleDrag);
                    juego.stopDragging();
                });
                //esta funcion crea otra clase juego en la variable juego y ejecuta la funcion draw que dibuja el tablero desde cero
                document.getElementById("reiniciar").addEventListener("click", () =>{
                    document.getElementById("ganador").innerHTML= "";
                    juego = new Juego(ctx, 1400, 1000, turno, team1, team2, filas, columnas);
                    juego.draw();
                });
            }else{
                //por cuestiones de esteticas y logica se muestra este mensaje 
                alert("Ingrese un valor de filas y columnas mayor a 4 y menor a 8");
            }
        }else{
            alert("Complete todos los campos");
        }
    });

});