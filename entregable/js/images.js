
let canvas2 = document.getElementById("canvasPaint");
let ctx2 = canvas2.getContext('2d');

// let width = 640;
// let height = 480;

let buttonsBlackAndWithe= document.getElementById("aBlancoNegro");
let buttonInvertirColores= document.getElementById("invertirColores");
let buttonVolverCambios= document.getElementById("buttonVolverCambios");
let btnBrillo= document.getElementById("brillo");

buttonsBlackAndWithe.addEventListener("click", () => cambiarBlancoNegro(ctx2));
buttonInvertirColores.addEventListener("click", () => invertirColores(ctx2));
buttonVolverCambios.addEventListener("click", () => invertirCambios(ctx2));
btnBrillo.addEventListener("click", () => brillo());


let inputImage= document.getElementById("inputImage");
let imageData= null;

inputImage.addEventListener("change", () =>{
    let reader = new FileReader();

    reader.onload= () =>{
        let image= new Image();
        image.src= reader.result;
        image.onload= () => {
            let escala= getEscalaImg(img);
            let x= (canvas2.width/2) - (image.width/2) * escala;
            let y= (canvas2.height/2) - (image.heigth/2) * escala;
            ctx2.drawImage(image,x,y,image.width*escala,image.height*escala);
            // ctx2.putImageData(ctx2.getImageData(),0,0,canvas2.width,canvas2.height);
            // imageData= ctx2.getImageData(0,0, 400, 600);  //Guardo la data de la foto original 
            ctx2.putImageData(image,0, 0);
        }
    }
    reader.readAsDataURL(inputImage.files[0]);

});

function getEscalaImg(img){
    let width= img.width/canvas2.width;
    let heigth= img.heigth/canvas2.heigth;

    if(width < heigth)
        return width;
    else
        return heigth;
}

// borrar imagen inputImage.files= [];

document.getElementById("deleteImage").addEventListener("click", () => {
    document.getElementById("inputImage").value=""; //elimina el valor del input
    canvas2.width= canvas2.width; //esto elimina la foto del canvas
});


document.getElementById("sepia").addEventListener("click", () =>{
    invertirCambios();
    let datosImg= ctx2.getImageData(0,0, 400, 600);
    let pixels= datosImg.data;
    let numPixels = imageData.width * imageData.height; //saco la cantidad de elementos de la matriz (pixels)
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
    let datosImg= ctx2.getImageData(0,0, 400, 600);
    let pixels= datosImg.data;
    let numPixels = imageData.width * imageData.height; //saco la cantidad de elementos de la matriz (pixels)
    console.log(numPixels)
    for ( let i = 0; i < numPixels; i++ ) {
        console.log("aaaaa")
        let r = pixels[ i * 4 ];
        let g = pixels[ i * 4 + 1 ];
        let b = pixels[ i * 4 + 2 ];

        let hsl = rgbToHsl(r, g, b);
        hsl[1] += hsl[1] + .9999;
        let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

        datosImg.data[i * 4] = rgb[0];
        datosImg.data[i * 4 + 1] = rgb[1];
        datosImg.data[i * 4 + 2] = rgb[2];

    }
    ctx2.putImageData( datosImg, 0, 0 );

    //ESTO ES CONTRASTE
    // let imageData = ctx2.getImageData(0,0, 400, 600);
    // let pixels= imageData.data;
    // let numPixels = imageData.width * imageData.height;
    // let contrast = 100; // Default value
 
    // let factor = ( 259 * ( contrast + 255 ) ) / ( 255 * ( 259 - contrast ) );
 
    // for ( var i = 0; i < numPixels; i++ ) {
    //     var r = pixels[ i * 4 ];
    //     var g = pixels[ i * 4 + 1 ];
    //     var b = pixels[ i * 4 + 2 ];
 
    //     pixels[ i * 4 ] = factor * ( r - 128 ) + 128;
    //     pixels[ i * 4 + 1 ] = factor * ( g - 128 ) + 128;
    //     pixels[ i * 4 + 2 ] = factor * ( b - 128 ) + 128;
    // }
 
    // ctx2.putImageData( imageData, 0, 0 );
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



const myDrawImage = (imageData) => {
        ctx2.drawImage(imageData, 0, 0);
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

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    
    if (max == min) {
        h = s = 0; 
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
                case g:
                h = (b - r) / d + 2;
                break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                }
                h /= 6;
    }
    
    return [h, s, l];
}
function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

document.getElementById("blur").addEventListener("click", () =>{
    invertirCambios();
    let image = ctx2.getImageData(0, 0, imageData.width, imageData.height);
    let matriz = [[1, 1, 1],[1, 1, 1],[1, 1, 1]];
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            matrizOfPixel(image, x, y, matriz)
        }
    }

    ctx2.putImageData(image, 0, 0);
});

document.getElementById("deteccionBordes").addEventListener("click", () =>{
    invertirCambios();
    let image = ctx2.getImageData(0, 0, imageData.width, imageData.height);
    let matriz = [[1, 1, 1],[1, 0.2, 1],[1, -1, -1]];
    // let matriz = [[1, 1, 1],[1, 0, 1],[1, -1, -1]];
    // let matriz = [[0, 1, 0],[1, -4, 1],[0, 1, 0]];
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            matrizOfPixel(image, x, y, matriz)
        }
    }

    ctx2.putImageData(image, 0, 0);
});

function matrizOfPixel (image, x, y, matriz) {
    promedioColor = (color) => {
        p0 = image.data[ul + color] * matriz[0][0]/9;
        p1 = image.data[uc + color] * matriz[0][1]/9;
        p2 = image.data[ur + color] * matriz[0][2]/9;
        p3 = image.data[ml + color] * matriz[1][0]/9;
        p4 = image.data[mc + color] * matriz[1][1]/9;
        p5 = image.data[mr + color] * matriz[1][2]/9;
        p6 = image.data[ll + color] * matriz[2][0]/9;
        p7 = image.data[lc + color] * matriz[2][1]/9;
        p8 = image.data[lr + color] * matriz[2][2]/9;
    }

    let ul = ((x - 1 + image.width) % image.width + image.width * ((y - 1 + image.height) % image.height)) * 4;
    let uc = ((x - 0 + image.width) % image.width + image.width * ((y - 1 + image.height) % image.height)) * 4;
    let ur = ((x + 1 + image.width) % image.width + image.width * ((y - 1 + image.height) % image.height)) * 4;
    let ml = ((x - 1 + image.width) % image.width + image.width * ((y + image.height) % image.height)) * 4;
    let mc = ((x - 0 + image.width) % image.width + image.width * ((y + image.height) % image.height)) * 4;
    let mr = ((x + 1 + image.width) % image.width + image.width * ((y + image.height) % image.height)) * 4;
    let ll = ((x - 1 + image.width) % image.width + image.width * ((y + 1 + image.height) % image.height)) * 4;
    let lc = ((x - 0 + image.width) % image.width + image.width * ((y + 1 + image.height) % image.height)) * 4;
    let lr = ((x + 1 + image.width) % image.width + image.width * ((y + 1 + image.height) % image.height)) * 4;

    let p0, p1, p2, p3, p4, p5, p6, p7, p8;
    
    promedioColor(0);
    let red = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8);

    promedioColor(1);
    let green = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8);

    promedioColor(2);
    let blue = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8);

    image.data[mc] = red;
    image.data[mc + 1] = green;
    image.data[mc + 2] = blue;
    image.data[mc + 3] = image.data[lc + 3];
}



function invertirColores(ctx){
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

function brillo(){
    // invertirCambios();
    let data = ctx2.getImageData(0, 0, imageData.width, imageData.height);
    let pixels = data.data;
    console.log(pixels)

    for (let i = 0; i < imageData.width * imageData.height; i++) {
        let r = pixels[i * 4];
        let g = pixels[i * 4 + 1];
        let b = pixels[i * 4 + 2];


        pixels[i * 4] = r + 25;
        pixels[i * 4 + 1] = g + 25;
        pixels[i * 4 + 2] = b + 25;
        //va aumentado hasta que llega al color blanco
    }
    ctx2.putImageData(data, 0, 0)
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
// for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//         dragImgDegrado(imageData,x,y,255+x,0+x,0+x,255+x);
//     }

//  }
//  ctx3.putImageData(imageData, 50, 50);