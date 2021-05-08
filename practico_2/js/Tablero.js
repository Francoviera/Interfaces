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
                    ocupado: false
                };
                if(x==0){
                    this.espacios[y] = new Array(this.size);
                }
                this.espacios[y][x]= blankSpace;
            }
        }
    }

    checkMove(ficha) {
        debugger;
        // let j= 1;
        let place= {
            x: "",
            y: ""
        }
        while(x < this.espacios[x][y].length && ){
            if (ficha.x >= this.espacios[x][i].posX && this.espacios[x][y].posX <= ficha.x) {

            }
        }
        for (let x = 0; x < this.espacios[x].length; x++) {
            if (ficha.x >= this.espacios[x][i].posX && this.espacios[x][y].posX <= ficha.x) {
                for (let y = 0; j < this.espacios[j][i].length; j++) {
                    if(!this.espacios[j][i].ocupado){
                        place.x= this.espacios[j][i].posX;
                        place.y= this.espacios[j][i].posY;
                    }else{
                        return place;
                    }
                }
            }
        }
        return place;
    }   

    draw(){
        for (let ficha of this.team1) {
            ficha.draw();
        }
        for (let ficha of this.team2) {
            ficha.draw();
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
    getSelected(x, y){
        for (let ficha of this.team1) {
            if(ficha.hit(x,y)){
                return ficha;
            }
        }
    }
}