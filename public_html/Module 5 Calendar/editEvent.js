/* 
* This file is used to edit an event in the database 
*/

const eventUpdateBtn = document.getElementById("updateBtn");

eventUpdateBtn.addEventListener("click",()=>{

const eventTitle = document.getElementById("event-title").value;
const eventID = document.getElementById("event-id").value;
const eventDate = document.getElementById("event-date").value;
const eventTimeStart = document.getElementById("event-start").value;
const eventTimeEnd = document.getElementById("event-end").value;
const eventDescription = document.getElementById("event-description").value;
const username = document.getElementById("currUser").innerText;
const eventEditToken = document.getElementById("eventEditToken").value;
const shareWith = document.getElementById("event-share").value;

// Sends the event edit data to the editEvent.php file
const data = {"eventTitle": eventTitle, "eventID": eventID, "eventDate": eventDate, "eventTS": eventTimeStart, "eventTE": eventTimeEnd, "eventDesc":eventDescription, "username":username, "eventToken": eventEditToken, "shareWith":shareWith};
fetch("editEvent.php", {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{'content-type': 'application/json'}
})
.then(response =>response.json())
.then(data=>{
    alert(data.message);
    if(data.success){
        alert("Click on the event again in the Events List to view your event with the new changes");
    }
    getEvents();
   
})
.catch(err => console.error(err));
},false)