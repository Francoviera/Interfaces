class Juego{
    constructor(ctx, width, heigth, turno, team1, team2, filas, columnas){
        this.ctx= ctx;
        this.heigth= heigth;
        this.width= width;
        this.dibujando= false;
        this.team1= true;
        this.turno= turno;
        this.finalizo= false;
        this.nameTeam1= team1;
        this.nameTeam2= team2;
        this.tablero= new Tablero(ctx, filas,columnas);
        this.posInicial= {
            x: null,
            y: null
        }
        this.draw();
        this.iniciarTemporizador();
    }

    iniciarTemporizador(){
        let i= 0;
        let temp= document.getElementById("temporizador");
        setInterval(function(){
            temp.innerHTML= i;
            i++;
            if(i == 10){
                this.team1 = !this.team1;
                // console.log(this.team1);
                if(this.team1){
                    this.turno.innerHTML= "Rojas";
                }else{
                    this.turno.innerHTML= "Azules";
                }
                i= 0;
            }
        },1000);
    }

    draw(){
        this.ctx.clearRect(0,0, this.width, this.heigth);
        this.tablero.draw();
    }

    checkHit(x, y){
        console.log(this.team1)
        let selectedChip = this.tablero.getSelected(x, y, this.team1);
        let team= "team2";
        if(this.team1 === true){
            team= "team1";
        }
        if (selectedChip && !this.finalizo && selectedChip.team == team) {
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
        debugger;     
        if(!this.selectedChip.enUso ){
            let place= this.tablero.checkMove(this.selectedChip);

            if(place != null && place.x != "" && place.y != ""){
                
                this.selectedChip.move(place.x + 45, place.y + 45);
                this.selectedChip.enUso= true;
                this.team1= !this.team1;
                if(this.team1){
                    this.turno.innerHTML= "Rojas";
                }else{
                    this.turno.innerHTML= "Azules";
                }
            }else{
                console.log("place null")
                this.selectedChip.move(this.posInicial.x, this.posInicial.y);
            }
            this.posInicial= {x: null, y: null}
            this.draw();
        }
    }
    checkJuego(){
        let resultado= this.tablero.checkJuego(this.selectedChip);
        let msj= "";

        if(resultado != null){
            this.finalizo = true;
            if(resultado == "team1"){
                msj= "Has Ganado!! "+ this.nameTeam1;
            }else{
                msj= "Has Ganado!! "+ this.nameTeam2;
            }
                document.getElementById("ganador").innerHTML=msj;

        }
    }
}