class Ficha{
    constructor(x,y,radio, ctx, color, team, imgFicha){
        this.x= x;
        this.y= y;
        this.radio= radio;
        this.ctx= ctx;
        this.color= color;
        this.team= team;
        this.imgFicha= imgFicha;
        this.enUso= false;
        this.draw();
    }
    //esta funcion dibuja la ficha con su posicion dada, su radio y su imagen en el canvas
    draw(){
        this.ctx.beginPath();
        // this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x,this.y,this.radio,0, 2 * Math.PI);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.moveTo(110,75);
        this.ctx.drawImage(this.imgFicha, this.x - this.radio, this.y - this.radio, 2*this.radio, 2*this.radio);
    }
    //devuelve la posicion de la ficha
    getPosition(){
        return{
            x: this.x,
            y: this.y,
        }
    }

    //devuelve true o false dependiendo si la posicion dada coinciden con la posicion x e y de la ficha
    hit(x,y){
        return  (Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2) < this.radio);
    }
    //esta funcion cambia la posicion x e y de la ficha en el tablero
    move(x,y){
        this.x = x;
        this.y = y;
    }
}
