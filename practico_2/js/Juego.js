class Juego{
    constructor(ctx, heigth, width){
        this.ctx= ctx;
        this.heigth= heigth;
        this.width= width;
        this.dibujando= false;
        this.tablero= new Tablero(ctx);
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
        if(this.dibujando === true && this.selectedChip){
            this.selectedChip.move(posX, posY);
            this.draw();
        }
    }
    stopDragging(){
        if(this.dibujando === true){
            this.checkMove();
        }
        this.dibujando = false;
    }
    checkMove(){
        // this.tablero.checkMove(this.selectedChip)
    }
}