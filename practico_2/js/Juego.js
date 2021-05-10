class Juego{
    constructor(ctx, width, heigth, turno){
        this.ctx= ctx;
        this.heigth= heigth;
        this.width= width;
        this.dibujando= false;
        this.team1= true;
        this.turno= turno;
        this.tablero= new Tablero(ctx);
        this.posInicial= {
            x: null,
            y: null
        }
    }

    draw(){
        this.ctx.clearRect(0,0, this.width, this.heigth);
        this.tablero.draw();
    }

    checkHit(x, y){
        let selectedChip = this.tablero.getSelected(x, y, this.team1);
        console.log(selectedChip)
        if (selectedChip) {
            this.dibujando = true;
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }
    handleDrag(posX, posY){
        if(this.dibujando && this.selectedChip){
            if(this.posInicial.x == null){
                this.posInicial.x = this.selectedChip.x;
                this.posInicial.y = this.selectedChip.y;
            }
            this.selectedChip.move(posX, posY);
            this.draw();
            console.log("handleDrag")
        }
    }
    stopDragging(){
        if(this.dibujando){
            this.checkMove();
            this.checkJuego();
            console.log("stopDragging")
        }
        this.dibujando = false;
    }
    checkMove(){
        let place= this.tablero.checkMove(this.selectedChip);
        if(place == null){
            console.log("place null")
            this.selectedChip.move(this.posInicial.x, this.posInicial.y);
        }else{
            this.selectedChip.move(place.x + 45, place.y + 45);
            this.team1= !this.team1;
            if(this.team1){
                this.turno.innerHTML= "Team 1";
            }else{
                this.turno.innerHTML= "Team 2";
            }
        }
        this.posInicial= {x: null, y: null}
        this.draw();
    }
    checkJuego(){
        console.log("juego"+this.tablero.checkJuego(this.selectedChip));
    }
}