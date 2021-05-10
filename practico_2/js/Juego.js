class Juego{
    constructor(ctx, width, heigth){
        this.ctx= ctx;
        this.heigth= heigth;
        this.width= width;
        this.dibujando= false;
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
        let selectedChip = this.tablero.getSelected(x, y);
        if (selectedChip) {
            console.log("encontro")
            this.dibujando = true;
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }
    handleDrag(posX, posY){
        if(this.dibujando && this.selectedChip){
            if(this.posInicial.x == null){
                console.log(this.selectedChip)
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
            // this.checkJuego();
            console.log("stopDragging")
        }
        this.dibujando = false;
    }
    checkMove(){
        let place= this.tablero.checkMove(this.selectedChip);
        if(place == null){
            console.log(this.posInicial)
            this.selectedChip.move(this.posInicial.x, this.posInicial.y);
            this.posInicial= {x: null, y: null}
        }else{
            this.selectedChip.move(place.x + 45, place.y + 45);
        }
        this.draw();
    }
    checkJuego(x, y){

    }
}