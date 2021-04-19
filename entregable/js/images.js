
let canvas = document.getElementById("practica");
let ctx = canvas.getContext('2d');
let canvas2 = document.getElementById("practicaEdited");
let ctx2 = canvas2.getContext('2d');
let canvas3 = document.getElementById("practicaEditedDegrade");
let ctx3 = canvas3.getContext('2d');
let width = 640;
let height = 480;
canvas3.width = 800;
canvas3.height = 600;
let imgData= ctx3.createImageData(width, height);
let imageData = new Image();

let buttonsBlackAndWithe= document.getElementById("aBlancoNegro");
let buttonInvertirColores= document.getElementById("invertirColores");
let buttonVolverCambios= document.getElementById("buttonVolverCambios");

let inputImage= document.getElementById("inputImage");

inputImage.addEventListener("onchange", () =>{
    let reader = new reader();

    reader.onload= () =>{
        let image= new Image();
        image.src= reader.result;
        reader.result= new Image();
        image.onload= () => {
            canvas.height = image.height;
            canvas.width= image.width;
            ctx.putImageData(image,0,0);
        }
    }
});


imageData.src = './images/download.jpg';

imageData.onload = () => {
    myDrawImage(imageData);
}

buttonsBlackAndWithe.addEventListener("click", () => cambiarBlancoNegro(canvas2, ctx2));
buttonInvertirColores.addEventListener("click", () => invertirColores(canvas2, ctx2));
buttonVolverCambios.addEventListener("click", () => invertirColores(ctx, ctx2));



const myDrawImage = (imgData) => {
        ctx.drawImage(imgData, 0, 0);
        ctx2.drawImage(imgData, 0, 0);
        let datos= ctx2.getImageData(0,0, 400, 600);
        // for (let index = 0; index < 600*400; index++) {
        //     datos.data[index * 4]= 4;
        // }
        // ctx2.putImageData(datos,0,0);
        // invertirColores(canvas2, ctx2);
        // cambiarBlancoNegro(canvas2, ctx2);
    }

function invertirCambios(ctx, ctx2){
    let datos= ctx.getImageData(0,0, 400, 600);
    ctx2.putImageData(datos,0,0);
}

const  dragImgDegrado = (imgData,x,y,r,g,b,a) => {
    let index = (x + y * imgData.height) *4;
    imgData.data[index + 0] = r;
    imgData.data[index + 1] = g;
    imgData.data[index + 2] = b;
    imgData.data[index + 3] = a;
}

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        dragImgDegrado(imgData,x,y,255+x,0+x,0+x,255+x);
    }

 }
 ctx3.putImageData(imgData, 50, 50);
    

function invertirColores(canvas, ctx){
    console.log("llega")
    let datosImg= ctx.getImageData(0,0, 400, 600);
    let data= datosImg.data;
    for (let index = 0; index < data.length; index+=4) {
        datosImg.data[index] = 255 - datosImg.data[index];
        datosImg.data[index+1] = 255 - datosImg.data[index+1];
        datosImg.data[index+2] = 255 - datosImg.data[index+2];

    }
    ctx.putImageData(datosImg,0,0);
}

function cambiarBlancoNegro(canvas, ctx){
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