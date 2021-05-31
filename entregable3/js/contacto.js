document.addEventListener("DOMContentLoaded", function (){
    let preloder= document.querySelector("#preloder");
    let home= document.querySelector(".home");
    let formulario= document.querySelector(".formulario");

    let imgNegan= document.querySelector(".imgNegan");
    let imgRick= document.querySelector(".imgRick");
    let countdown= document.querySelector(".countdown");
    let page= document.querySelector(".page");
    
    //MENU LINKS
    let nav= document.querySelector(".nav");
    // let btnHome= document.querySelector(".btnHome");
    let btnEscenas= document.querySelector(".btnEscenas");
    let btnPersonajes= document.querySelector(".btnPersonajes");
    let btnContacto= document.querySelector(".btnContacto");
    
    
    //NAV
    let iconMenu= document.querySelector(".iconMenu");
    let iconMenuClose = document.querySelector(".iconMenuClose");
    let menu= document.querySelector("#menu");

    menu.addEventListener("change", function (){
        iconMenu.classList.toggle("ocultar");
        iconMenuClose.classList.toggle("ocultar");
        console.log("ee")
    });

    let altura= 900;


    let percent= document.querySelector(".percent");

    window.onscroll = function() {
        let percentY= (window.scrollY/70);
        let widthImg= 44-(percentY+1);
        let heigthImg= 57-(percentY+1);

        // console.log((percentY+1))
        // console.log(widthImg)

        let alturaY= window.scrollY;
        console.log("y", window.scrollY)
        // home.style.height= `${altura+alturaY}px`;

        //agrego margen para que no se desplaze la pantalla
        if(((percentY-5)/10) < 1){
            home.style.marginTop= `${alturaY}px`;
        }

        //Oculto nav
        if(Math.round(percentY+1) >= 5){
            nav.classList.add("desplazarNavArriba");
            nav.classList.remove("desplazarNavAbajo");
            iconMenu.classList.add("ocultar");
        }else{
            nav.classList.remove("desplazarNavAbajo");
            nav.classList.add("desplazarNavAbajo");
            iconMenu.classList.remove("ocultar");
        }
        
        
        imgRick.style.width= `${widthImg}%`;
        imgRick.style.height= `${heigthImg}%`;
        imgNegan.style.width= `${widthImg}%`;
        imgNegan.style.height= `${heigthImg}%`;
        if((percentY+1) > 6){
            home.style.opacity= (1-(percentY-5)/10);
            home.style.filter= "alpha(opacity="+((1-(percentY-5)/10)*10)+")";
            if((1-(percentY-5)/10) <= 0){
                console.log("MOSTRAR")
                formulario.classList.add("showPermanente");
                formulario.classList.remove("hidePermanente");
            }else{
                formulario.classList.add("hidePermanente");
                formulario.classList.remove("showPermanente");   
                console.log("Ocultar")
            }
            // carrousel.style.filter= "alpha(opacity="+((1-(percentY-7)/10)*10)+")";
        }
    };
    
    loadPage();

    function loadPage() {
        let i= 0;
        let percentCount= 9;
        let interval= setInterval(function(){
            percentCount+= 7;
            if(i === 3){
                loading= false;

                //se oculta el preloader
                preloder.classList.toggle("hide");
                
                //se espera un segundo y se hace un fadeIn al contenido de la pagina
                setTimeout(function(){
                    preloder.classList.toggle("ocultar");
                    document.querySelector(".center").classList.toggle("ocultar");
                    page.classList.toggle("ocultar");
                    page.classList.toggle("show");  
                }, 1000);

                //esto vendria a ser el desplazamiento de countdown hacia arriba cuando se muestra la pagina
                setTimeout(function(){
                    countdown.classList.toggle("fadeInUp");
                    countdown.classList.toggle("ftco-animate");
                    countdown.classList.toggle("ftco-animated");
                    imgRick.classList.toggle("reducirImg");
                    imgNegan.classList.toggle("reducirImg");
                    setTimeout(function(){
                        document.querySelector(".imgSangre").classList.toggle("hideBlood");
                        imgRick.classList.toggle("reducirImg");
                        imgNegan.classList.toggle("reducirImg");

                    }, 1000);
                    // setTimeout(function(){
                    //     document.querySelector(".imgZombieRoto").classList.toggle("showPermanente");  
                    // }, 5000);

                }, 1050);
                //se frena el interval
                clearInterval(interval);
            }
            percent.innerHTML= percentCount + "%";
            i+= 0.25;
        }, 250);
    }

    const topDate = new Date('June 31, 2021 00:00:00 GMT-03:00');

    const updateClock = (date) => {
        let countdown_seconds= document.querySelector(".countdown_seconds");
        let countdown_minutes= document.querySelector(".countdown_minutes");
        let countdown_hours= document.querySelector(".countdown_hours");
        let countdown_days= document.querySelector(".countdown_days");

        let end = date.getTime();
        let now = Date.now();
        let diff = end - now;
        countdown_days.innerHTML= Math.floor(diff / 86400000);
        diff = diff % 86400000
        countdown_hours.innerHTML= Math.floor(diff / 3600000);
        diff = diff % 3600000;
        countdown_minutes.innerHTML= Math.floor(diff / 60000);
        diff = diff % 60000;
        countdown_seconds.innerHTML= Math.floor(diff / 1000);
    }



    setInterval(() => {
        updateClock(topDate);
    }, 1000); 
});