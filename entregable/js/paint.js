let canvasPaint = document.getElementById('canvasPaint');
    let ctxPaint = canvasPaint.getContext('2d');
    let heigth= 500;
    let width= 800;

    ctxPaint.lineWidth=1;

    var ruta=false;

    function dibujar(evento){
        x=evento.clientX-canvasPaint.offsetLeft;
        y=evento.clientY-canvasPaint.offsetTop;

        console.log("x", x);
        console.log("y", y);


        if(ruta==true){
            ctxPaint.lineTo(x,y);
            console.log("Posicion X:"+ x +" Y:" +y)
            ctxPaint.stroke();
        }
    }

    canvasPaint.addEventListener('mousemove',dibujar);
    document.getElementById('body').addEventListener('mouseup',() => {
        ruta= false;
    });

    canvasPaint.addEventListener('mousedown',function(){
        ruta=true;
        ctxPaint.beginPath();
        ctxPaint.moveTo(x,y);
        console.log("Posicion inicial X:"+ x +" Y:" +y)
        canvasPaint.addEventListener('mousemove', dibujar);

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