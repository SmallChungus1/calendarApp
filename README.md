[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/JB3ChsFY)
# CSE330
Nicholas Eng - 508413 - NicholasEng26

Hanson Li - 508736 - SmallChungus1

Link to project: 
http://ec2-3-131-133-126.us-east-2.compute.amazonaws.com/~neng/Module%205%20Calendar/calendar.html

Need to filter for user input! 

Login Details: 
1. user: Bob | Password: 123
2. user: John | Password: 12
3. user: Someguy1 | Password: 123
4. user: wustl | password: wustl

Notes: 

Creative portion: 

1. OpenweatherMap API: Made fetch calls to OpenweatherMap API to display the current temperature and weather of St. Louis and dispalyed it on the calendar. Based on the weather and temperature, it will make a suggestion to user on how they can plan their day.

Link to openweathermap API: https://openweathermap.org/

2. MediaStack API: Made fetch calls to the MediaStack API to get and display news headline onto the calendar. Note: Due to the free tier plan, we are getting older news from this summer and have to limit api response to just 10 news per call. 

Link to MediaStack API: https://mediastack.com/product

3. Sharing Events: Users can share their event with an additional user upon event creation or while editing the event. The shared with user cannot edit or delete the event.

4. Search Bar: Implemented a search bar on the top of our page (next to logout button once logged in) to search for owned events and events shared with you based on title and description. The searched events will be displayed in the search events list.