class Tablero{
    constructor(ctx){
        this.ctx= ctx;
        this.team1= [];
        this.team2= [];
        this.cantFichas= 16;
        this.sizeTablero= 8;
        this.espacios= [[]];
        this.dibujarLugaresTablero();
        this.cargarFichas();
    }

    cargarFichas(){
        for (let i = 0; i < this.cantFichas; i++) {            
            this.team1.push(new Figura(100,100+(i*20),40, this.ctx, "red", "team1"));
            this.team2.push(new Figura(1100,100+(i*20),40, this.ctx, "blue", "team2"));
        }
    }
    dibujarLugaresTablero(){
        for (let y = 0; y < this.sizeTablero; y++) {
            for (let x = 0; x < this.sizeTablero; x++) {
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
        // debugger;
        let x= 0;
        let y= 0;
        let foundX= false;
        let foundY= false;

        while(x < 8 && y < 8 ){
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
                if(this.checkHorizontal(x,y, ficha) || this.checkVertical(x,y, ficha)){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

    checkHorizontal(x, y, ficha){
        let j = 3;
        let cantFichas= 0;
        for (let i = -2; i < j; i++) {
            if(i != 0 && x+i > 0 && x+i < 8){
                if(this.espacios[y][x+i] && this.espacios[y][x+i].team == ficha.team){
                    cantFichas++;
                }
            }
        }
        return cantFichas == 4;
    }

    checkVertical(x, y, ficha){
        let j = 3;
        let cantFichas= 0;
        for (let i = -2; i < j; i++) {
            if(i != 0 && x+i > 0 && y+i < 8){
                if(this.espacios[y][x+i] && this.espacios[y+i][x].team == ficha.team){
                    cantFichas++;
                }
            }
        }
        return cantFichas == 4;
    }

    checkMove(ficha) {
        if((ficha.x >= 200 && ficha.x <= 1000) && (ficha.y >= 200 && ficha.y <= 1000)){
            let x= 0;
            let y= 0;
            let foundX= false;
            let place= {
                x: "",
                y: ""
            }
            while(x < 8 && y < 8 ){
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
                        if(y == 7){
                            this.espacios[y][x].ocupado = true;
                            this.espacios[y][x].team = ficha.team;
                        }
                        y++;
                    }else{
                        this.espacios[y-1][x].ocupado = true;
                        return place;
                    }
                }
            }

            // console.log(this.espacios[x][y].length)
            // while(y < 8){
            //     if(!this.espacios[x][y].ocupado){
            //         place.x= this.espacios[x][y].posX;
            //         place.y= this.espacios[x][y].posY;
            //         y++;
            //     }else{
            //         return place;
            //     }
            // }
            // for (let x = 0; x < this.espacios[x].length; x++) {
            //     if (ficha.x >= this.espacios[x][i].posX && this.espacios[x][y].posX <= ficha.x) {
            //         for (let y = 0; j < this.espacios[j][i].length; j++) {
            //             if(!this.espacios[j][i].ocupado){
            //                 place.x= this.espacios[j][i].posX;
            //                 place.y= this.espacios[j][i].posY;
            //             }else{
            //                 return place;
            //             }
            //         }
            //     }
            // }
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