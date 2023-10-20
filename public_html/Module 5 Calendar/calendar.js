const currentDate = document.querySelector(".current-date");
const currentDay = document.querySelector(".current-day");
const daysTag = document.querySelector(".days");
const prevNext_Month = document.querySelectorAll(".icons_month span");
const prevNext_Day = document.querySelectorAll(".icons_day span");

// Get current date, year, and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
let currDay = date.getDate();
let day = date.getDate();
let today = date.getDay();

let selectedDay = new Date(currYear, currMonth, currDay);
let selectedDayString = [selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate()];

const months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November","December"];

// When this runs for the first the selected date needs to be the current
const renderCalendar = (year, month, day) => {
    // Get the last date of the month
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    // Get the first day of the month
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    // Get the last day of the prev month
    let lastDateOfLastMonth = new Date(year, month, 0).getDate();
    let lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();

    selectedDay = new Date(year, month, day);
    
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {

        if (i === selectedDay.getDate() && year === selectedDay.getFullYear() && month === selectedDay.getMonth()) {
            liTag += `<li class="active" onclick="handleDayClick(${i}, ${month}, ${year})">${i}</li>`;
        } else if(i === currDay && year === date.getFullYear() && month === date.getMonth()) {
            liTag += `<li class="today" onclick="handleDayClick(${i}, ${month}, ${year})">${i}</li>`;
        } 
        else {
            liTag += `<li onclick="handleDayClick(${i}, ${month}, ${year})">${i}</li>`;
        }
        
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerHTML = `${months[month]} ${year}`;
    daysTag.innerHTML = liTag;
    console.log("RenderCal  Selected Date: " + selectedDay.getDate());
}

const renderCalendarEvents = (day, month, dayNumber, year) => {
    currentDay.innerHTML = `${month} ${dayNumber}, ${year}`;
    console.log("RenderCalEvents Selected Date: " + selectedDay.getDate());
}

renderCalendar(currYear, currMonth);

prevNext_Month.forEach((icons_month) => {
    // Fix the icons - separate thje month and day
    // Also need to cycle for years
    icons_month.addEventListener("click", () => {
        currMonth = icons_month.id==="prev_month" ? currMonth - 1 : currMonth + 1;
        if (selectedDay.getMonth() === currMonth) {
            renderCalendar(currYear, currMonth, selectedDay.getDate());
        } else {
            renderCalendar(currYear, currMonth);
        }
    })
});

// This needs to be fixed -- be able to find the selected day
prevNext_Day.forEach((icons_day) => {
    icons_day.addEventListener("click", () => {
        activeElement = document.querySelector('.active');
        selectedDay.setDate(selectedDay.getDate() + (icons_day.id==="prev_day" ? -1 : 1));
        renderCalendar(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());
        renderCalendarEvents(selectedDay.getDate(), months[selectedDay.getMonth()], selectedDay.getDate(), selectedDay.getFullYear());
    })
});

const handleDayClick = (day, month, year) => {
    console.log(`Clicked on day ${day} of month ${month} in year ${year}`);
    const active = document.querySelector('.active');
    if (active) {
        active.classList.remove('active');
    }
    event.target.classList.add('active');

    if (!event.target.classList.contains('inactive')) {
        event.target.classList.add('active');
        renderCalendar(year, month, day);
        renderCalendarEvents(day, months[month], day, year);
    }
};

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});
