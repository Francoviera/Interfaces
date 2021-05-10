document.addEventListener("DOMContentLoaded", ()=>{
    // let width= 500;
    // let heigth= 600;

    let canvas= document.getElementById("canvas");
    // canvas.width= width;
    // canvas.heigth= heigth;

    let ctx= canvas.getContext('2d');
    //  ctx.beginPath();
    //  ctx.arc(100,100,50,0,100);
    //  ctx.fill();
    //  ctx.closePath();

    let juego = new Juego(ctx, 1400, 1000);

    juego.draw();

    canvas.addEventListener('mousedown', (eMouseDown) =>{
        if(juego.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)){
            canvas.addEventListener('mousemove', (eMouseMove) => {
                juego.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY);
            });
           
        }
    })
    canvas.addEventListener('mouseup', (eMouseUp) => {
        console.log("borro")
        canvas.removeEventListener('mousemove', juego.handleDrag);
        juego.stopDragging();
    })

    //  canvas.addEventListener("click", (event) => {
    //      console.log(event)
    //     let radio= Math.sqrt(((event.offsetX -100) ** 2) + ((event.offsetY - 100) ** 2));
    //     if(radio < 50){
    //         console.log("adentro")
    //         canvas.addEventListener('mousedown', () =>{
    //             canvas.addEventListener('mouseup', (event) =>{
    //                 ctx.clearRect(0,0,canvas.width,canvas.height)
    //                 ctx.beginPath();
    //                 ctx.arc(event.offsetX,event.offsetY,50,0,100);
    //                 ctx.fill();
    //                 ctx.closePath();
    //             });
    //         });
    //     }
    //  });
});