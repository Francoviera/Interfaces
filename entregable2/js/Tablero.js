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

    cargarFichas(){
        let imgFichaRoja = new Image();
        imgFichaRoja.src = './images/fichaRoja.png';
        let imgFichaAzul = new Image();
        imgFichaAzul.src = './images/fichaAzul.png';
        imgFichaRoja.onload = () => {
            for (let i = 0; i < this.cantFichas; i++) {       
                this.team1.push(new Ficha(100,100+(i*20),40, this.ctx, "red", "team1", imgFichaRoja));
            }
        }
        imgFichaAzul.onload = () => {
            for (let i = 0; i < this.cantFichas; i++) {       
                this.team2.push(new Ficha((this.columnas*100)+300,100+(i*20),40, this.ctx, "blue", "team2", imgFichaAzul));
            }
        }
        
    }
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

    isPlace(ficha, place){
        return ((ficha-place) < 100);
    }

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

    checkMove(ficha) {
        if(ficha.x >= 200 && ficha.x <= this.columnas+1*100 && ficha.y >= 100 && ficha.y<= this.filas+1*100){
            let x= 0;
            let y= 0;
            let foundX= false;
            let place= {
                x: "",
                y: ""
            }
            while(x < this.columnas && y < this.filas ){
                if (!foundX && this.isPlace(ficha.x, this.espacios[y][x].posX)) {
                    foundX= true;
                }
                if(!foundX){
                    x++;
                }
                if(foundX){
                    if(!this.espacios[y][x].ocupado){
                        place.x= this.espacios[y][x].posX;
                        place.y= this.espacios[y][x].posY;
                        if(y == this.filas-1){
                            this.espacios[y][x].ocupado = true;
                            this.espacios[y][x].team = ficha.team;
                        }
                        y++;
                    }else{
                        this.espacios[y-1][x].ocupado = true;
                        this.espacios[y-1][x].team = ficha.team;
                        return place;
                    }
                }
            }

            return place;
        }else{
            return null;
        }
    }   

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