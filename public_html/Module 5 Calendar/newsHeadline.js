/*
*  This file is used to get the news headlines from the news API
*/

let newsAPIURL = 'http://api.mediastack.com/v1/news?access_key=72e432e266e0da8013602f23fc6f3a4f&limit=10'

fetch(newsAPIURL, {
    "method": "GET", //Gettting data from the Open Weather API and not making changes to our backend. Info is also not sensitive So we used GET instead of POST

})
.then(response => response.json())
.then(data => {
    console.log(data);
    num = Math.floor(Math.random() * 9);
    const headline1 = data.data[num];
    const headline1Title = headline1.title;
    const headline1URL = headline1.url;
    const headline1Date = headline1.published_at;
    const headline1author = headline1.author;
    const headline1Source = headline1.source;
    const headline1Desc = headline1.description;
    console.log(headline1, headline1Title, headline1URL, headline1Date, headline1author);
    document.getElementById("newsSource").innerText = headline1Source;
    document.getElementById("newsTitle").innerText = headline1Title;
    document.getElementById("newsDesc").innerText = headline1Desc;

})
.catch(err => console.error(err));