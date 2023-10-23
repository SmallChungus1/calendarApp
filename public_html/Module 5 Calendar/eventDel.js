const eventDelBtn = document.getElementById("deleteEventBtn")

eventDelBtn.addEventListener("click",()=>{

    
    const eventID = document.getElementById("event-id").value;
    const eventTitle = document.getElementById("event-title").value;
    const username = document.getElementById("currUser").innerText;
    const eventEditToken = document.getElementById("eventEditToken").value;

    
    const data = {"eventID": eventID, "username": username, "eventToken": eventEditToken, "eventTitle":eventTitle};
    console.log(data);
    fetch("eventDel.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'content-type': 'application/json'}
    })
    .then(response =>response.json())
    .then(data=>{
        alert(data.message);
        cleardisplayEvents();
       
    })
    .catch(err => console.error(err));
    },false)