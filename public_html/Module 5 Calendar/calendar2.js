
let currentMonth = new Month(2023, 9); // October 2023
const months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November","December"];
let loggedInStatus = false;
let currentRenderedEvents = [];
let currDaytemp = null;
let fullDate;
let prevSelectedDay = null;

const viewMyCal = document.getElementById("viewSelfOnly");
const viewMyAndShareCal = document.getElementById("viewShared");
const viewShareCal = document.getElementById("viewJustShared");


document.addEventListener("DOMContentLoaded", updateCalendar, false);
document.addEventListener("DOMContentLoaded", deactivateShareOption, false);
window.addEventListener("load", ()=>{
	const data = {};
	fetch("checkLogInStatus.php", {
		method: "POST",
		body: JSON.stringify(data),
        headers:{'content-type': 'application/json'}
	})
	.then(response => response.json())
	.then(data =>{
		alert(data.message);
		if(data.success){
			loggedInStatus = true;
		}
	})
	.catch(err => console.error(err));
}, false);

editEventBtn = document.getElementById("editEventBtn");
editEventBtn.addEventListener("click", showEdit, false);
editEventBtn.disabled = true;
createEventBtn = document.getElementById("addEventBtn");
createEventBtn.addEventListener("click", showCreate, false);

delateEventBtn = document.getElementById("deleteEventBtn");

searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchEvents, false);

document.getElementById("calYear").innerText = currentMonth.year;
document.getElementById("calMonth").innerText = months[currentMonth.month];

document.getElementById("nextMonth").addEventListener("click", function(event){
	currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	//handleClick();
	console.log("The new month is "+currentMonth.month+" "+currentMonth.year);
	document.getElementById("calYear").innerText = currentMonth.year;
	document.getElementById("calMonth").innerText = months[currentMonth.month];
}, false);

document.getElementById("prevMonth").addEventListener("click", function(event){
	currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	//handleClick();
	console.log("The new month is "+currentMonth.month+" "+currentMonth.year);
	document.getElementById("calYear").innerText = currentMonth.year;
	document.getElementById("calMonth").innerText = months[currentMonth.month];
}, false);

// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar(){
	clearCal();
	let weeks = currentMonth.getWeeks();
	
	for(let w in weeks){
		let days = weeks[w].getDates();
		// console.log("weeks: "+w);
		weekID = "w"+w;
		
		for(let d in days){
			
			if(days[d].getMonth() === currentMonth.month){
				const oneDay = document.createElement("TD");
				
				dateNum = document.createTextNode(days[d].getDate());
				oneDay.appendChild(dateNum);
				
				document.getElementById(weekID).appendChild(oneDay);

			}else{

				const oneDay = document.createElement("TD");
				dateNum = document.createTextNode("-");
				oneDay.appendChild(dateNum);
				document.getElementById(weekID).appendChild(oneDay);
						
			}
		}
	}

	if(loggedInStatus){
		handleClick();
		refreshColorCalendar();
	}
	
}

function handleClick(){
	clearEventList();
	for(let i = 0; i < 7; i++){

		weekID = "w"+i
		let dayOfWeek = document.getElementById(weekID);
		//console.log(dayOfWeek);
		let currDay = dayOfWeek.getElementsByTagName("TD");
		//console.log(currDay.length);
		for (let k = 0; k<currDay.length; k++){
			//console.log(currDay[i])
			// fullDate = currentMonth.year+"-"+(currentMonth.month+1)+"-"+currDay[k].innerText;
			fullDate = currentMonth.year+"-"+(currentMonth.month+1)+"-"+currDay[k].innerText;
			
			//currDaytemp = currDay[k];
			//colorCalendar();
			//refreshColorCalendar();

		

			currDay[k].addEventListener("click",function(){
				
				if(prevSelectedDay){
					prevSelectedDay.classList.remove("currSelectedDate");
				}
				fullDate = currentMonth.year+"-"+(currentMonth.month+1)+"-"+currDay[k].innerText;
				prevSelectedDay = currDay[k];
				currDay[k].classList.add("currSelectedDate");
				getEvents();
				
				
				//console.log(fullDate);
			}, false);
		}
	}
}


viewMyCal.addEventListener("click", ()=>{
	
	 //currentRenderedEvents = [];
	
	getEvents();
	refreshColorCalendar();
	
}, false);

viewMyAndShareCal.addEventListener("click", ()=>{
	
	// currentRenderedEvents = [];
	
	getEvents();
	refreshColorCalendar();
	
}, false);

 viewShareCal.addEventListener("click", ()=>{
	
	// currentRenderedEvents = [];
	
	getEvents();
	refreshColorCalendar();
	
}, false);


	function colorCalendar(currDay2, fullDate2){
		
		const sharedOptions = document.getElementsByName("shareOption");
		let shareValue = null;
		for (let i=0; i<sharedOptions.length; i++){
			if(sharedOptions[i].checked){
				shareValue = sharedOptions[i].value;
				break;
			}
		}
		const data = {'date': fullDate2, 'shareValue':shareValue};
		fetch("eventServe.php", {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{'content-type': 'application/json'}
		})
		.then(response=>response.json())
		.then(data => {
			if(data.success){
				currDay2.classList.add("activeEventDates");
			}
			
		})
		.catch(err => console.error(err))

	}

	function refreshColorCalendar(){
		for(let i = 0; i < 7; i++){

			let weekID2 = "w"+i
			let dayOfWeek2 = document.getElementById(weekID2);
			
			let currDay2 = dayOfWeek2.getElementsByTagName("TD");
			let fullDate2;
			for (let k = 0; k<currDay2.length; k++){
				 fullDate2 = currentMonth.year+"-"+(currentMonth.month+1)+"-"+currDay2[k].innerText;
				colorCalendar(currDay2[k], fullDate2);
			}
		}
	}	


	function getEvents(){
		clearEventList();
		const currDate = fullDate;
		const sharedOptions = document.getElementsByName("shareOption");
		let shareValue = null;
		for (let i=0; i<sharedOptions.length; i++){
			if(sharedOptions[i].checked){
				shareValue = sharedOptions[i].value;
				break;
			}
		}
		
		const data = {'date': currDate, 'shareValue': shareValue};
		console.log(data);
		fetch("eventServe.php", {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{'content-type': 'application/json'}
		})
		.then(response=>response.json())
		.then(data=> {
			if(data.success){
				eventsArray = data.message;
				document.getElementById("eventDate").innerText=eventsArray[0]["eventDate"];
				for (let i = 0; i<eventsArray.length; i++){
					
					const singleEvent = eventsArray[i];
					const anEvent = document.createElement("li");
					eventTitle = document.createTextNode(singleEvent["title"]);
					currentRenderedEvents.push(currDaytemp);
					console.log(currentRenderedEvents);
					
					anEvent.appendChild(eventTitle);
					anEvent.addEventListener("click", () => {

						
						cleardisplayEvents();
						document.getElementById("eventDetailTitle").innerText = singleEvent["title"];
						document.getElementById("eventDetailDate").innerText = singleEvent["eventDate"];
						document.getElementById("eventDetailTS").innerText = singleEvent["timeStart"];
						document.getElementById("eventDetailTE").innerText = singleEvent["timeEnd"];
						document.getElementById("eventDetailDesc").innerText = singleEvent["description"];
						document.getElementById("eventDetailID").innerText = singleEvent["eventID"];
						document.getElementById("eventSharedWith").innerText = singleEvent["sharedWith"];
						document.getElementById("eventDetailOwner").innerText = singleEvent["owner"];

						document.getElementById("event-title").value = singleEvent["title"];
						document.getElementById("event-id").value = singleEvent["eventID"];
						document.getElementById("event-date").value = singleEvent["eventDate"];
						document.getElementById("event-start").value = singleEvent["timeStart"];
						document.getElementById("event-end").value = singleEvent["timeEnd"];
						document.getElementById("event-description").value = singleEvent["description"];
						document.getElementById("event-share").value = singleEvent["sharedWith"];
						toggleEditBtn();
					}, false)
					document.getElementById("EventList").appendChild(anEvent);
				}

				
				

				
			}else{
				alert(`Data Retrival not successful ${data.message}`);
				document.getElementById("eventDate").innerText=fullDate;
				document.getElementById("eventListInnerText").innerText="No Events Yet";
			}
		}  
			)
		.catch(err => console.error(err))


	}
//}
function toggleEditBtn(){
	if (document.getElementById("currUser").innerText !== document.getElementById("eventDetailOwner").innerText ){
        
        document.getElementById("deleteEventBtn").disabled = true;
		document.getElementById("updateBtn").disabled = true;
    }else{
       
        document.getElementById("updateBtn").disabled = false;
		document.getElementById("deleteEventBtn").disabled = false;
    }
}

function activateShareOption(){
	let shareButtons = document.getElementsByName("shareOption");
	for (let i = 0; i < shareButtons.length; i++){
		shareButtons[i].disabled = false;
	}
}

function deactivateShareOption(){
	let shareButtons = document.getElementsByName("shareOption");
	for (let i = 0; i < shareButtons.length; i++){
		shareButtons[i].disabled = true;
	}
}
function searchEvents(){
	clearSearchEvents();
	let searchData = document.getElementById("search-input").value;
	const data = {'searchData': searchData};
	console.log(data);
	fetch("eventSearch.php", {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{'content-type': 'application/json'}
	})
	.then(response=>response.json())
	.then(data=> {
		if(data.success){
			searchEventsArray = data.message;
			
			let searchEventsList = document.getElementById("searchEventList");

			for (let i = 0; i<searchEventsArray.length; i++){
				
				const singleEvent = searchEventsArray[i];
				const anEvent = document.createElement("li");
				eventTitle = document.createTextNode(singleEvent["title"]);

				document.getElementById("searchQuery").innerText = searchData;
				document.getElementById("search-input").value = "";
				
				anEvent.appendChild(eventTitle);
				anEvent.addEventListener("click", () => {
					cleardisplayEvents();
					document.getElementById("eventDetailTitle").innerText = singleEvent["title"];
					document.getElementById("eventDetailDate").innerText = singleEvent["eventDate"];
					document.getElementById("eventDetailTS").innerText = singleEvent["timeStart"];
					document.getElementById("eventDetailTE").innerText = singleEvent["timeEnd"];
					document.getElementById("eventDetailDesc").innerText = singleEvent["description"];
					document.getElementById("eventDetailID").innerText = singleEvent["eventID"];
					document.getElementById("eventSharedWith").innerText = singleEvent["sharedWith"];
					document.getElementById("eventDetailOwner").innerText = singleEvent["owner"];

					document.getElementById("event-title").value = singleEvent["title"];
					document.getElementById("event-id").value = singleEvent["eventID"];
					document.getElementById("event-date").value = singleEvent["eventDate"];
					document.getElementById("event-start").value = singleEvent["timeStart"];
					document.getElementById("event-end").value = singleEvent["timeEnd"];
					document.getElementById("event-description").value = singleEvent["description"];
					document.getElementById("event-share").value = singleEvent["sharedWith"];
				}, false)
				searchEventsList.appendChild(anEvent);
			}
			
		}else{
			alert(`Data Retrival not successful ${data.message}`);
			document.getElementById("eventDate").innerText=fullDate;
			document.getElementById("eventListInnerText").innerText="No Events Yet";
		}
	}  
		)
	.catch(err => console.error(err))

}

function clearSearchEvents(){
	const searchEventList = document.getElementById("searchEventList");
	let currEvent = Array.from(searchEventList.getElementsByTagName("LI"));
	currEvent.forEach(aChild => {
		aChild.remove();
	})
}

function cleardisplayEvents(){
	document.getElementById("eventDetailTitle").innerText="";
	document.getElementById("eventDetailDate").innerText="";
	document.getElementById("eventDetailTS").innerText="";
	document.getElementById("eventDetailTE").innerText="";
	document.getElementById("eventDetailDesc").innerText="";
	document.getElementById("eventSharedWith").innerText = "";


	document.getElementById("event-title").value = "";
	document.getElementById("event-id").value = "";
	document.getElementById("event-date").value = "";
	document.getElementById("event-start").value = "";
	document.getElementById("event-end").value = "";
	document.getElementById("event-description").value = "";
	document.getElementById("event-share").value = "";
}

function showEdit() {
	const eventDetailDisplay = document.getElementsByClassName("event-detail-display")[0];
	const eventDetailDisplayForm = document.getElementsByClassName("event-detail-display-form")[0];
	const deleteEventBtn = document.getElementById("deleteEventBtn");
	
	if (eventDetailDisplay.style.display === "none") {
		eventDetailDisplay.style.display = "block";
		eventDetailDisplayForm.style.display = "none";
		deleteEventBtn.style.display = "none";
	} else {
		eventDetailDisplay.style.display = "none";
		eventDetailDisplayForm.style.display = "block";
		deleteEventBtn.style.display = "block";
	}
	
}

function showCreate() {
	const listEvents = document.getElementsByClassName("list-events")[0];
	const createEvent = document.getElementsByClassName("create-event")[0];
	
	if (listEvents.style.display === "none") {
		listEvents.style.display = "block";
		createEvent.style.display = "none";
	} else {
		listEvents.style.display = "none";
		createEvent.style.display = "block";
	}
}

function showCreateCalendar(){
	const listEvents = document.getElementsByClassName("list-events")[0];
	const createEvent = document.getElementsByClassName("create-event")[0];
	
	if (listEvents.style.display === "none") {
		listEvents.style.display = "block";
		createEvent.style.display = "none";
	} else {
		listEvents.style.display = "none";
		createEvent.style.display = "block";
	}
	
}

function clearEventList(){

	const eventList = document.getElementById("EventList");
	document.getElementById("eventListInnerText").innerText="";
	let currEvent = Array.from(eventList.getElementsByTagName("LI"));
	currEvent.forEach(aChild => {
		aChild.remove();
	})

}

function clearCal(){
	for(let i = 0; i < 7; i++){
		weekID = "w"+i
		let dayOfWeek = document.getElementById(weekID);
		let currDay = Array.from(dayOfWeek.getElementsByTagName("TD"));
		currDay.forEach(aChild => {
			aChild.remove();
		})
	}
}

//Don't touch this: weather functions
(function(){
    Date.prototype.deltaDays=function(c){
        return new Date(this.getFullYear(),this.getMonth(),this.getDate()+c)};

Date.prototype.getSunday=function(){return this.deltaDays(-1*this.getDay())}})();

function Week(c){this.sunday=c.getSunday();
    
    this.nextWeek=function(){return new Week(this.sunday.deltaDays(7))};
    
    this.prevWeek=function(){return new Week(this.sunday.deltaDays(-7))};
    
    this.contains=function(b){return this.sunday.valueOf()===b.getSunday().valueOf()};
    
    this.getDates=function(){for(var b=[],a=0;7>a;a++)b.push(this.sunday.deltaDays(a));return b}}


function Month(c,b){this.year=c;
    this.month=b;
    this.nextMonth=function(){return new Month(c+Math.floor((b+1)/12),(b+1)%12)};
    this.prevMonth=function(){return new Month(c+Math.floor((b-1)/12),(b+11)%12)};
    this.getDateObject=function(a){return new Date(this.year,this.month,a)};
    this.getWeeks=function(){var a=this.getDateObject(1),b=this.nextMonth().getDateObject(0),c=[],a=new Week(a);
        for(c.push(a);!a.contains(b);)a=a.nextWeek(),c.push(a);return c}};

//Don't touch above: weather functions



// Navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});