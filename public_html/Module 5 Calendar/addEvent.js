
// This file is used to add an event to the database

const createEventBtn = document.getElementById("createEventBtn");

createEventBtn.addEventListener("click", ()=>{
const eventTitle = document.getElementById("create-event-title").value;
const eventDate = document.getElementById("create-event-date").value;
const eventTS = document.getElementById("create-event-start").value;
const eventTE = document.getElementById("create-event-end").value;
const eventDesc = document.getElementById("create-event-description").value;
const username = document.getElementById("currUser").innerText;
const sharedWith = document.getElementById("create-share-event").value;
const eventCreateToken = document.getElementById("eventCreateToken").value;

    const data = {"eventTitle": eventTitle, "eventDate":eventDate,"eventTS":eventTS,"eventTE":eventTE,"eventDesc":eventDesc, "username":username, "eventToken":eventCreateToken, "sharedWith":sharedWith};
    // Sends the event create data to the addEvent.php file
    fetch("addEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'content-type': 'application/json'}
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            alert(data.message);
            //handleClick(); //! check if this is really necessary to use to add color after adding event
            refreshColorCalendar();
        }else{
            alert(data.message);
        }
    })
    .catch(err => console.error(err));
},false)