function drag(event){
    console.log(event)
    event.dataTransfer.setData("text", event.target.id);
}
function allowDrop(event){
    event.preventDefault();
    console.log("llega")
}