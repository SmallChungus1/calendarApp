// Safe from XSS attacks; that is, all content is escaped on output (3 points)
// Safe from SQL Injection attacks (2 points)
// CSRF tokens are passed when adding/editing/deleting events (3 points)
// Session cookie is HTTP-Only (3 points)


const createEventBtn = document.getElementById("createEventBtn");



createEventBtn.addEventListener("click", ()=>{
const eventTitle = document.getElementById("create-event-title").value;
const eventDate = document.getElementById("create-event-date").value;
const eventTS = document.getElementById("create-event-start").value;
const eventTE = document.getElementById("create-event-end").value;
const eventDesc = document.getElementById("create-event-description").value;
const username = document.getElementById("currUser").innerText;
const eventCreateToken = document.getElementById("eventCreateToken").value;
    // console.log("username: ", username);
    // console.log("eventTitle: ", eventTitle);
    // console.log("date: ", eventDate);
    // console.log("clicked!");
   // console.log("event token: ", eventCreateToken);
    const data = {"eventTitle": eventTitle, "eventDate":eventDate,"eventTS":eventTS,"eventTE":eventTE,"eventDesc":eventDesc, "username":username, "eventToken":eventCreateToken};
    fetch("addEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'content-type': 'application/json'}
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            alert(data.message);
            handleClick(); //! check if this is really necessary to use to add color after adding event
        }else{
            alert(data.message);
        }
    })
    .catch(err => console.error(err));



},false)