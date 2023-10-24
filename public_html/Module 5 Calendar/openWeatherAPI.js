document.addEventListener("DOMContentLoaded", weatherAPICall, false);

function weatherAPICall(){
    console.log("API Callked");
fetch("http://api.openweathermap.org/data/2.5/weather?appid=83ace4c88bc338ad1fd46f3bd1a4fd93&q=St%20Louis", {
    "method": "GET", //Gettting data from the Open Weather API and not making changes to our backend. So we used GET instead of POST
    


})
.then(response => response.json())
.then(data=>{
    console.log(typeof(data));
    console.log(data);
    console.log(data.coord);
})
.catch(err => console.error(err));
}



