document.addEventListener("DOMContentLoaded", ()=>{

    let canvas= document.getElementById("canvas");
    let ctx= canvas.getContext('2d');

    let turno= document.getElementById("turno");
    let btnCargar= document.getElementById("btnCargar");


    
    btnCargar.addEventListener("click", (e) => {
        e.preventDefault();
        let team1= document.getElementById("team1").value;
        let team2= document.getElementById("team2").value;
        let filas= document.getElementById("filas").value;
        let columnas= document.getElementById("columnas").value;
        if(team1 && team2 && filas && columnas){
            if(filas > 3 && columnas > 3){
                document.getElementById("formulario").classList.toggle("ocultar");
                document.getElementById("juego").classList.toggle("ocultar");
                
                let juego = new Juego(ctx, 1400, 1000, turno, team1, team2, filas, columnas);
                juego.draw();
                
                canvas.addEventListener('mousedown', (eMouseDown) =>{
                    if(juego.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)){
                        canvas.addEventListener('mousemove', (eMouseMove) => {
                            juego.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY);
                        });
                        
                    }
                })
                canvas.addEventListener('mouseup', (eMouseUp) => {
                    canvas.removeEventListener('mousemove', juego.handleDrag);
                    juego.stopDragging();
                });
                document.getElementById("reiniciar").addEventListener("click", () =>{
                    document.getElementById("ganador").innerHTML= "";
                    juego = new Juego(ctx, 1400, 1000, turno, team1, team2, filas, columnas);
                    juego.draw();
                });
            }else{
                alert("Ingrese un valor de filas y columnas mayor a 4");
            }
        }else{
            alert("Complete todos los campos");
        }
    });

});