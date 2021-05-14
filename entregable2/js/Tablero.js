class Tablero{
    constructor(ctx, filas, columnas){
        this.ctx= ctx;
        this.team1= [];
        this.team2= [];
        this.cantFichas= 16;
        this.sizeTablero= 8;
        this.filas= filas;
        this.columnas= columnas;
        this.espacios= [[]];
        this.cargarFichas();
        this.dibujarLugaresTablero();
    }
    //esta funcion crea la fichas con sus respectivas imagenes y datos de su lugar y las guarda en un arreglo
    cargarFichas(){
        let imgFichaRoja = new Image();
        imgFichaRoja.src = './images/fichaRoja.png';
        let imgFichaAzul = new Image();
        imgFichaAzul.src = './images/fichaAzul.png';
        //una vez que cargo la imagen, crea las fichas con esa imagen
        imgFichaRoja.onload = () => {
            for (let i = 0; i < this.cantFichas; i++) {       
                this.team1.push(new Ficha(100,100+(i*20),40, this.ctx, "red", "team1", imgFichaRoja));
            }
        }
        //una vez que cargo la imagen, crea las fichas con esa imagen
        imgFichaAzul.onload = () => {
            for (let i = 0; i < this.cantFichas; i++) {       
                this.team2.push(new Ficha((this.columnas*100)+300,100+(i*20),40, this.ctx, "blue", "team2", imgFichaAzul));
            }
        }
    }

    //esta funcion crea los lugares del tablero con su posicion y estilo y los guarda en un arreglo llamado "espacios"
    dibujarLugaresTablero(){
        for (let y = 0; y < this.filas; y++) {
            for (let x = 0; x < this.columnas; x++) {
                let blankSpace = {
                    posX: 200 + (x * 100),
                    posY: 100 + (y * 100),
                    width: 90,
                    height: 90,
                    ocupado: false,
                    team: ""
                };
                if(x==0){
                    this.espacios[y] = new Array(this.size);
                }
                this.espacios[y][x]= blankSpace;
            }
        }
    }
    //esta funcion verifica que si la posicon de la ficha con la posicion place (que puede ser X o Y) si son iguales 
    //si es menor a 100 es porque las posiciones concuerdan
    isPlace(ficha, place){
        return ((ficha-place) < 100);
    }
    //esta funcion primero busca la posicion de la ficha en el tablero y despues ejecuta las funcion que verifican si hay 4 fichas en lineas,
    //ya sea en vertical, horizontal o digagonales
    checkJuego(ficha){
        let x= 0;
        let y= 0;
        let foundX= false;
        let foundY= false;

        while(x < this.columnas && y < this.filas ){
            if (!foundX && this.isPlace(ficha.x, this.espacios[y][x].posX)) {
                foundX= true;
            }
            if(!foundX){
                x++;
            }
            if(foundX && !foundY){
                if(this.isPlace(ficha.y, this.espacios[y][x].posY)){
                   foundY= true;
                }else{
                    y++
                }
            }
            if(foundX && foundY){
                if(this.checkDiagonalDerecha(x,y, ficha) || this.checkDiagonalIzquierda(x,y,ficha) || this.checkHorizontal(x,y, ficha) || this.checkVertical(x,y, ficha)){
                    return ficha.team;
                }else{
                    return null;
                }
            }
        }
    }

    //esta funcion busca de arriba a la izquierda hasta abajo a la derecha en diagonal si hay 4 fichas en fila
    checkDiagonalIzquierda(x, y, ficha){
        let j = 4;
        let cantFichas= 0;
        for (let i = -3; i < j; i++) {
            if(i != 0 && (x+i >= 0 && x+i < this.columnas) && (y+i >= 0 && y+i < this.filas)){
                if(this.espacios[y+i][x+i] && this.espacios[y+i][x+i].team == ficha.team){
                    cantFichas++;
                }else{
                    if(cantFichas < 3){
                        cantFichas = 0;
                    }
                }
            }
        }
        return cantFichas >= 3;
    }
    //esta funcion busca 4 fichas en fila desde arriba a la derecha hasta abajo a la izquierda en diagonal de forma continua
    checkDiagonalDerecha(x, y, ficha){
        let j = 4;
        let cantFichas= 0;
        for (let i = -3; i < j; i++) {
            if(i != 0 && (x-i >= 0 && x-i < this.columnas) && (y+i >= 0 && y+i < this.filas)){
                if(this.espacios[y+i][x-i] && this.espacios[y+i][x-i].team == ficha.team){
                    cantFichas++;
                }else{
                    if(cantFichas < 3){
                        cantFichas = 0;
                    }
                }
            }
        }
        return cantFichas >= 3;
    }
    //esta funcion chequea si hay 4 fichas de forma horizontal desde 3 lugares de donde esta la ficha dada
    checkHorizontal(x, y, ficha){
        let j = 4;
        let cantFichas= 0;
        for (let i = -3; i < j; i++) {
            if(i != 0 && x+i >= 0 && x+i < this.columnas){
                if(this.espacios[y][x+i] && this.espacios[y][x+i].team == ficha.team){
                    cantFichas++;
                }else{
                    if(cantFichas < 3){
                        cantFichas = 0;
                    }
                }
            }
        }
        return cantFichas >= 3;
    }
    //esta funcion busca 4 fichas en continuo desde 3 lugares de arriba y abajo de la posicion de la ficha dada
    checkVertical(x, y, ficha){
        let j = 4;
        let cantFichas= 0;
        for (let i = 1; i < j; i++) {
            if(i != 0 && y+i >= 0 && y+i < this.filas){
                if(this.espacios[y+i][x] && this.espacios[y+i][x].team == ficha.team){
                    cantFichas++;
                }else{
                    if(cantFichas < 3){
                        cantFichas = 0;
                    }
                }
            }
        }
        return cantFichas >= 3;
    }
    //esta funcion busca un lugar en el tablero con la posicion de la ficha dada 
    checkMove(ficha) {
        if(ficha.x >= 200 && ficha.x <= this.columnas+1*100 && ficha.y >= 100 && ficha.y<= this.filas+0.5*100){
            let x= 0;
            let y= 0;
            let foundX= false;
            let place= {
                x: "",
                y: ""
            }
            while(x < this.columnas && y < this.filas ){
                //este if controla si la posicion x de la ficha concuerda con la x del especio del tablero
                if (!foundX && this.isPlace(ficha.x, this.espacios[y][x].posX)) {
                    foundX= true;
                }
                //si no se encontro x, se va aumentando
                if(!foundX){
                    x++;
                }
                //una vez que se encontro x entra al if
                if(foundX){
                    if(!this.espacios[y][x].ocupado){
                        place.x= this.espacios[y][x].posX;
                        place.y= this.espacios[y][x].posY;
                        //si es el ultimo lugar de y guarda la posicion le setea ocupado y team
                        if(y == this.filas-1){
                            this.espacios[y][x].ocupado = true;
                            this.espacios[y][x].team = ficha.team;
                        }
                        y++;
                    }else{
                        //si viene aca y los lugares fueron seteados, guarda el ultimo lugar seteado y le setea en ese espacio del tablero como ocupado y guarda el team
                        if(place.x != "" && place.y != ""){
                            this.espacios[y-1][x].ocupado = true;
                            this.espacios[y-1][x].team = ficha.team;
                        }
                        return place;
                    }
                }
            }

            return place;
        }else{
            return null;
        }
    }   
    //esta funcion dibuja las fichas cargadas y los espacios del tablero cargado en el arreglo
    draw(){
        for (let ficha of this.team1) {
            ficha.draw();
        }
        for (let ficha2 of this.team2) {
            ficha2.draw();
        }
        this.espacios.map(y =>{
            y.map(x => {
                this.ctx.beginPath();
                this.ctx.strokeStyle = "black";
                this.ctx.rect(x.posX, x.posY, x.width, x.height);
                this.ctx.stroke();
            })
        })
    }

    //esta funcion recorre las fichas del team1 o team2 dependiendo cual es el turno y ejecuta la funcion hit de cada ficha para saber cual fue la selecionada
    getSelected(x, y, team1){
        if(team1){
            for (let ficha of this.team1) {
                if(ficha.hit(x,y)){
                    return ficha;
                }
            }
        }else{
            for (let ficha of this.team2) {
                if(ficha.hit(x,y)){
                    return ficha;
                }
            }
        }
    }
}