
let currentMonth = new Month(2023, 9); // October 2023
const months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November","December"];

// Change the month when the "next" button is pressed

document.addEventListener("DOMContentLoaded", updateCalendar, false);
document.addEventListener("DOMContentLoaded", handleClick, false);
document.getElementById("calYear").innerText = currentMonth.year;
document.getElementById("calMonth").innerText = months[currentMonth.month];

//for use later: show/hide login/signups

// let regStatus = true;

// document.getElementById("loginTextCue").addEventListener("click", ()=>{
// 	if (regStatus){
// 		regStatus = false;
// 	}else{
// 		regStatus = true;
// 	}
	
// }, false);


// 	if(regStatus){
// 		document.getElementById("calSignUp").style.display='none';
		
// 	}else if (!regStatus){
		
// 		document.getElementById("calLogin").style.display='none';
// 	}

document.getElementById("nextMonth").addEventListener("click", function(event){
	currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	handleClick();
	console.log("The new month is "+currentMonth.month+" "+currentMonth.year);
	document.getElementById("calYear").innerText = currentMonth.year;
	document.getElementById("calMonth").innerText = months[currentMonth.month];
}, false);

document.getElementById("prevMonth").addEventListener("click", function(event){
	currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	handleClick();
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
	
		// days contains normal JavaScript Date objects.
		
		//console.log("Week starting on "+days[0]);
		
		for(let d in days){
			// You can see console.log() output in your JavaScript debugging tool, like Firebug,
			// WebWit Inspector, or Dragonfly.
			//console.log(days[d].toISOString());
			
			if(days[d].getMonth() === currentMonth.month){
				// const oneDay = document.createElement("p");
				// dateNum = document.createTextNode(days[d].getDate());
				// oneDay.appendChild(dateNum);
				// document.getElementById(days[d].getDay()).appendChild(oneDay);

				//console.log(weekID)
				const oneDay = document.createElement("TD");
				
				dateNum = document.createTextNode(days[d].getDate());
				oneDay.appendChild(dateNum);
				
				document.getElementById(weekID).appendChild(oneDay);

			}else{
			// 	const oneDay = document.createElement("p");
			// 	dateNum = document.createTextNode("-");
			// 	oneDay.appendChild(dateNum);
			// document.getElementById(days[d].getDay()).appendChild(oneDay);

				const oneDay = document.createElement("TD");
				dateNum = document.createTextNode("-");
				oneDay.appendChild(dateNum);
				document.getElementById(weekID).appendChild(oneDay);
						
			}
			
		}
	}
}



function handleClick(){
	
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
			colorCalendar(currDay[k]);

			currDay[k].addEventListener("click",function(){
				


				fullDate = currentMonth.year+"-"+(currentMonth.month+1)+"-"+currDay[k].innerText;
				getEvents();
				console.log(fullDate);
			}, false);
		}
	}

	function colorCalendar(currDay){
		const data = {'date': fullDate};
		fetch("eventServe.php", {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{'content-type': 'application/json'}
		})
		.then(response=>response.json())
		.then(data => {
			if(data.success){
				currDay.classList.add("activeEventDates");
			}
			
		})
		.catch(err => console.error(err))

	}
	function getEvents(){
		clearEventList();
		const currDate = fullDate;
		//const userName = document.getElementById("currUser");
		const data = {'date': currDate};
		fetch("eventServe.php", {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{'content-type': 'application/json'}
		})
		.then(response=>response.json())
		.then(data=> {
			if(data.success){
				alert(`Data retrival successful`);
				dataMsgArry = data.message;

				// alert(dataMsgArry["eventDate"]);
				// const anEvent = document.createElement("li");
				// title = document.createTextNode("Hello");
				// anEvent.appendChild(title);
				// document.getElementById("EventList").appendChild(anEvent);
				
				document.getElementById("eventDate").innerText=dataMsgArry[0]["eventDate"];
				for (let i = 0; i<dataMsgArry.length; i++){
					const singleEvent = dataMsgArry[i];
					const anEvent = document.createElement("li");
					eventTitle = document.createTextNode(singleEvent["title"]);
					
					anEvent.appendChild(eventTitle);
					anEvent.addEventListener("click", () => {
						cleardisplayEvents();
						document.getElementById("eventDetailTitle").innerText=singleEvent["title"];
						document.getElementById("eventDetailDate").innerText=singleEvent["eventDate"];
						document.getElementById("eventDetailTS").innerText=singleEvent["timeStart"];
						document.getElementById("eventDetailTE").innerText=singleEvent["timeEnd"];
						document.getElementById("eventDetailDesc").innerText=singleEvent["description"];
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
}


function cleardisplayEvents(){
	document.getElementById("eventDetailTitle").innerText="";
	document.getElementById("eventDetailDate").innerText="";
	document.getElementById("eventDetailTS").innerText="";
	document.getElementById("eventDetailTE").innerText="";
	document.getElementById("eventDetailDesc").innerText="";
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
		//console.log(dayOfWeek);
		let currDay = Array.from(dayOfWeek.getElementsByTagName("TD"));
		currDay.forEach(aChild => {
			aChild.remove();
		})
		// console.log(currDay);

		
		
	}
}


// document.getElementById("test").addEventListener("click", function(){
// 	alert("Clicked");
// }, false);



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

// Navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});
