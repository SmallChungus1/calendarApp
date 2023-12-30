Note:
This was a class project created by me and @NicholasEng26. I was responsible for building the user authentication/registration process, connecting to the 2 APIs used, generating the calendar, and all CRUD operations relating to calendar events using MySql. Nick built the entire frontend, the search feature, and hosted it on EC2

Live Link to project: 
http://ec2-3-131-133-126.us-east-2.compute.amazonaws.com/~neng/Module%205%20Calendar/calendar.html


How to use: 

Sign up with a username and password in the "welcome" box. You can then click on a date on the calendar and add/edit events. You can serach for your events in the "Search Events" box. 

Features:

1. OpenweatherMap API: Made fetch calls to OpenweatherMap API to display the current temperature and weather of St. Louis and displayed it on the calendar. Based on the weather and temperature, it will make a suggestion to the user on how they can plan their day.

Link to openweathermap API: https://openweathermap.org/

2. MediaStack API: Made fetch calls to the MediaStack API to get and display news headlines onto the calendar. Note: Due to the free tier plan, we are getting older news from this summer and have to limit api response to just 10 news per call. 

Link to MediaStack API: https://mediastack.com/product

3. Sharing Events: Users can share their event with an additional user upon event creation or while editing the event. The sharedWith user cannot edit or delete the event.

4. Search Bar: Implemented a search bar on the top of our page (next to the logout button on the navbar once logged in) to search for owned events and events shared with you based on title and description. The searched events will be displayed in the search events list.
