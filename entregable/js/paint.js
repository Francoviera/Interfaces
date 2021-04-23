let canvasPaint = document.getElementById('canvasPaint');
    let ctxPaint = canvasPaint.getContext('2d');
    let heigth= 500;
    let width= 800;
    let borrado= false;

    ctxPaint.lineWidth=1;

    var ruta=false;

    function dibujar(evento){
        x=evento.clientX-canvasPaint.offsetLeft;
        y=evento.clientY-canvasPaint.offsetTop;

        if(ruta==true){
            ctxPaint.lineTo(x,y);
            console.log("Posicion X:"+ x +" Y:" +y)
            ctxPaint.stroke();
        }
    }

    function borrar(event){
        x=mousePos(canvasPaint, event).x;
        y=mousePos(canvasPaint, event).y;

        if(borrado){
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
    btnBorrar.addEventListener('click',() => {
        borrado= !borrado
        if(borrado){
            btnBorrar.value="Dibujar";
        }else {
            btnBorrar.value="Borrar";
        }
    });

    canvasPaint.addEventListener('mousemove',dibujar);

    canvasPaint.addEventListener('mouseout', function() {
        ruta = false;
    })

    canvasPaint.addEventListener('mousedown',function(){
        if(!borrado){
            ruta=true;
            ctxPaint.beginPath();
            ctxPaint.moveTo(x,y);
            console.log("Posicion inicial X:"+ x +" Y:" +y)
            canvasPaint.addEventListener('mousemove', dibujar);
        }else{
            ctxPaint.beginPath();
            ctxPaint.moveTo(x,y);
            canvasPaint.addEventListener('mousemove', borrar);
        }

    });
    canvasPaint.addEventListener('mouseup', function(){
        ruta=false;
    })

    function colorLinea(color){
        console.log(color.value);
        ctxPaint.strokeStyle = color.value;
    }
    function anchoLinea(ancho){
        console.log(ancho.value);

        ctxPaint.lineWidth = ancho.value;
        document.getElementById("valor").innerHTML=ancho.value;
    }
    function limpiar(){
        ctxPaint.clearRect(0,0,canvasPaint.width,canvasPaint.height)
    }