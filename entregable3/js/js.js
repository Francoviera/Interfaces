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

    function fadeOutEffect() {
        let fadeEffect = setInterval(function () {
            console.log( page.style.opacity)
            // if (!page.style.opacity) {
            //     page.style.opacity = 0;
            // }
            if (page.style.opacity < 1) {
                page.style.opacity ++;
            } else {
                clearInterval(fadeEffect);
            }
        }, 200);
    }
});