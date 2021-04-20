
let canvas2 = document.getElementById("practicaEdited");
let ctx2 = canvas2.getContext('2d');

let width = 640;
let height = 480;

let buttonsBlackAndWithe= document.getElementById("aBlancoNegro");
let buttonInvertirColores= document.getElementById("invertirColores");
let buttonVolverCambios= document.getElementById("buttonVolverCambios");

buttonsBlackAndWithe.addEventListener("click", () => cambiarBlancoNegro(ctx2));
buttonInvertirColores.addEventListener("click", () => invertirColores(canvas2, ctx2));
buttonVolverCambios.addEventListener("click", () => invertirCambios(ctx2));

let inputImage= document.getElementById("inputImage");
let imageData= null;

inputImage.addEventListener("change", () =>{
    let reader = new FileReader();

    reader.onload= () =>{
        let image= new Image();
        image.src= reader.result;
        image.onload= () => {
            ctx2.drawImage(image,0,0,image.width,image.height);
            // ctx2.putImageData(ctx2.getImageData(),0,0,canvas2.width,canvas2.height);
            imageData= ctx2.getImageData(0,0, 400, 600);  //Guardo la data de la foto original 
        }
    }
    reader.readAsDataURL(inputImage.files[0]);

});

// borrar imagen inputImage.files= [];

document.getElementById("deleteImage").addEventListener("click", () => {
    document.getElementById("inputImage").value=""; //elimina el valor del input
    canvas2.width= canvas2.width; //esto elimina la foto del canvas
});


document.getElementById("sepia").addEventListener("click", () =>{
    invertirCambios();
    let datosImg= ctx2.getImageData(0,0, 400, 600);
    let pixels= datosImg.data;
    numPixels = imageData.width * imageData.height; //saco la cantidad de elementos de la matriz (pixels)
    for ( var i = 0; i < numPixels; i++ ) {
        var r = pixels[ i * 4 ];
        var g = pixels[ i * 4 + 1 ];
        var b = pixels[ i * 4 + 2 ];
 
        pixels[ i * 4 ] = 255 - r;
        pixels[ i * 4 + 1 ] = 255 - g;
        pixels[ i * 4 + 2 ] = 255 - b;
 
        pixels[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        pixels[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        pixels[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
 
    ctx2.putImageData( datosImg, 0, 0 );
});

document.getElementById("saturacion").addEventListener("click", () =>{
    invertirCambios();
    let imageData = ctx2.getImageData(0,0, 400, 600);
    let pixels= imageData.data;
    let numPixels = imageData.width * imageData.height;
    let contrast = 100; // Default value
 
    let factor = ( 259 * ( contrast + 255 ) ) / ( 255 * ( 259 - contrast ) );
 
    for ( var i = 0; i < numPixels; i++ ) {
        var r = pixels[ i * 4 ];
        var g = pixels[ i * 4 + 1 ];
        var b = pixels[ i * 4 + 2 ];
 
        pixels[ i * 4 ] = factor * ( r - 128 ) + 128;
        pixels[ i * 4 + 1 ] = factor * ( g - 128 ) + 128;
        pixels[ i * 4 + 2 ] = factor * ( b - 128 ) + 128;
    }
 
    ctx2.putImageData( imageData, 0, 0 );
});

document.getElementById("saveImage").addEventListener("click", () =>{
    var link = window.document.createElement( 'a' ),
        url = canvas2.toDataURL(),
        filename = 'screenshot.jpg';
 
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
});



const myDrawImage = (imgData) => {
        ctx2.drawImage(imgData, 0, 0);
        let datos= ctx2.getImageData(0,0, 400, 600);
        // for (let index = 0; index < 600*400; index++) {
        //     datos.data[index * 4]= 4;
        // }
        // ctx2.putImageData(datos,0,0);
        // invertirColores(canvas2, ctx2);
        // cambiarBlancoNegro(canvas2, ctx2);
    }

function invertirCambios(){
    ctx2.putImageData(imageData,0,0);
}

const  dragImgDegrado = (imgData,x,y,r,g,b,a) => {
    let index = (x + y * imgData.height) *4;
    imgData.data[index + 0] = r;
    imgData.data[index + 1] = g;
    imgData.data[index + 2] = b;
    imgData.data[index + 3] = a;
}

// for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//         dragImgDegrado(imgData,x,y,255+x,0+x,0+x,255+x);
//     }

//  }
//  ctx3.putImageData(imgData, 50, 50);
    

function invertirColores(canvas, ctx){
    invertirCambios();
    let datosImg= ctx.getImageData(0,0, 400, 600);
    let data= datosImg.data;
    for (let index = 0; index < data.length; index+=4) {
        datosImg.data[index] = 255 - datosImg.data[index];
        datosImg.data[index+1] = 255 - datosImg.data[index+1];
        datosImg.data[index+2] = 255 - datosImg.data[index+2];

    }
    ctx.putImageData(datosImg,0,0);
}

function cambiarBlancoNegro(ctx){
    invertirCambios();
    let datosImg= ctx.getImageData(0,0, 400, 600);
    let data= datosImg.data;
    for (let index = 0; index < data.length; index+=4) {
        let aux= 0.43 * datosImg.data[index] + 0.5 * datosImg.data[index+1] + 0.16 * datosImg.data[index+2]
        datosImg.data[index] = aux;
        datosImg.data[index+1] = aux;
        datosImg.data[index+2] = aux;

    }
    ctx.putImageData(datosImg,0,0);
}