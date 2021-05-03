
class Figura{
    let x;
    let y;
    let fill;
    let context;
    constructor(x,y,fill, context){
        this.x= x;
        this.y= y;
        this.fill= fill;
        this.context= context;
    }

    function setFill(fill){
        this.fill= fill;
    }
    function getPosition(){
        return{
            x: this.getX(),
            y: this.getY(),
        }
    }
    function getX(){
        return this.x;
    }
    function getY(){
        return this.x;
    }
}
