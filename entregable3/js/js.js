document.addEventListener("DOMContentLoaded", function (){
    let spinner= document.querySelector(".spinner");
    let preloder= document.querySelector("#preloder");
    let header= document.querySelector(".header");
    let footer= document.querySelector(".footer");
    let page= document.querySelector(".page");


    let percent= document.querySelector(".percent");

    let loading= true;
    loadPage();





    function loadPage() {
        let i= 0;
        let percentCount= 9;
        let interval= setInterval(function(){
            percentCount+= 7;
            if(i === 3){
                loading= false;
                // header.classList.toggle("ocultar");
                // footer.classList.toggle("ocultar");
                // fadeOutEffect();
                preloder.classList.toggle("hide");
                setTimeout(function(){
                    preloder.classList.toggle("ocultar");
                    page.classList.toggle("ocultar");
                    page.classList.toggle("show");
                }, 1000);
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