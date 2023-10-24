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
    const cityName = data.name;
    let temperature = data.main.temp;
    temperature = Number(temperature - 273.15); //convert to celsius
    temperature = Math.round(temperature);
    const weatherData = data.weather[0].main;
    const weatherDescData = data.weather[0].description;
    console.log(cityName, temperature, weatherData, weatherDescData);
    document.getElementById("cityName").innerText = cityName;
    document.getElementById("cityTemp").innerText = temperature;
    document.getElementById("cityWeather").innerText = weatherData;
    document.getElementById("cityWeatherDesc").innerText = weatherDescData;

    let recommendation;
if (temperature > 10 && !weatherData.includes("rain") ){
     recommendation = "Good weather! add outdoor activites to your calendar 😹😺";
    }else if (temperature > 30){
         recommendation = "It is too hot, plan your activites indoor 😾";
    }else if (temperature <= 10){
         recommendation = "A bit cold today to add outdoor activites to you calendar 😿";
    }else if (weatherData.includes("rain") || weatherData.contain("storm")){
         recommendation = "Bad weather today, should plan your day indoors 🙀";
    }
    document.getElementById("recommendedActivity").innerText = recommendation;
})
.catch(err => console.error(err));
}



