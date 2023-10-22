


const createEventBtn = document.getElementById("createEventBtn");
const eventTitle = document.getElementById("create-event-title");
const eventDate = document.getElementById("create-event-date");
const eventTS = document.getElementById("create-event-start");
const eventTE = document.getElementById("create-event-end");
const eventDesc = document.getElementById("create-event-description");

createEventBtn.addEventListener("click", ()=>{
    const data = {"eventTitle": userName};
    fetch("addEvent.php", {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers:{'content-type': 'application/json'}
    })
    .then(response=>response.json())
    .then(data)



},false)