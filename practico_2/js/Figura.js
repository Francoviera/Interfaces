class Figura{
    constructor(x,y,radio, ctx, color, team){
        this.x= x;
        this.y= y;
        this.radio= radio;
        this.ctx= ctx;
        this.color= color;
        this.team= team;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radio,0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.moveTo(110,75);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    // setFill(radio){
    //     this.radio= radio;
    // }
    getPosition(){
        return{
            x: this.x,
            y: this.y,
        }
    }
    hit(x,y){
        return  (Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2) < this.radio);
    }
    move(x,y){
        this.x = x;
        this.y = y;
    }
}
