document.addEventListener("DOMContentLoaded", function (){
    let checkbox = document.querySelector("input[name=checkbox]");
    let btns = document.querySelectorAll(".btn-grid");

    checkbox.addEventListener("change", function() {
    let checked = this.checked;
    for (let btn of btns) {
        checked ? (btn.disabled = false) : (btn.disabled = true);
    }
    });
});