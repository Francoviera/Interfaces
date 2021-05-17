let canvasPaint = document.getElementById('canvasPaint');
    let ctxPaint = canvasPaint.getContext('2d');
    let heigth= 500;
    let width= 800;
    let borrado= false;

    ctxPaint.lineWidth=1;

    let trazo=false;

    function dibujar(evento){
        x=evento.clientX-canvasPaint.offsetLeft;
        y=evento.clientY-canvasPaint.offsetTop;

        if(!borrado && trazo){
            ctxPaint.lineTo(x,y);
            console.log("Posicion X:"+ x +" Y:" +y)
            ctxPaint.stroke();
        }
    }

    function borrar(event){
        x=mousePos(canvasPaint, event).x;
        y=mousePos(canvasPaint, event).y;

        if(borrado && trazo){
            ctxPaint.clearRect(x,y,20,20);
        }
    }

    function mousePos(canvas, event){
       let clientRect= canvas.getBoundingClientRect();
       return{
           x: Math.round(event.clientX - clientRect.left),
           y: Math.round(event.clientY - clientRect.top)
       }
    }
    let btnBorrar= document.getElementById('borrarActive');
    let btnDibujar= document.getElementById('dibujarActive');

    btnBorrar.addEventListener('click',() => {
        borrado= true;
    });

    btnDibujar.addEventListener('click',() => {
        borrado= false;
    });

    canvasPaint.addEventListener('mousemove',dibujar);

    canvasPaint.addEventListener('mouseout', function() {
        trazo = false;
    })

    canvasPaint.addEventListener('mousedown',function(){
        if(!borrado){
            trazo=true;
            ctxPaint.beginPath();
            ctxPaint.moveTo(x,y);
            console.log("posicion x:"+ x +" y:" +y)
            canvasPaint.addEventListener('mousemove', dibujar);
        }else{
            trazo=true;
            ctxPaint.beginPath();
            ctxPaint.moveTo(x,y);
            canvasPaint.addEventListener('mousemove', borrar);
        }

    });
    canvasPaint.addEventListener('mouseup', function(){
        trazo=false;
    })

    function colorLinea(color){
        ctxPaint.strokeStyle = color.value;
    }
    function anchoLinea(ancho){
        ctxPaint.lineWidth = ancho.value;
        document.getElementById("valor").innerHTML=ancho.value;
    }
    function limpiar(){
        ctxPaint.clearRect(0,0,canvasPaint.width,canvasPaint.height)
    }