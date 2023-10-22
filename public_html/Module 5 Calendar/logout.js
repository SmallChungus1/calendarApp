const logOutBtn = document.getElementById("LogOutBtn");
const userName = document.getElementById("username").value;
const data = {"username": userName}

logOutBtn.addEventListener("click", ()=>{
    console.log("clicked");
    fetch("logout.php",{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'content-type': 'application/json'}
      })
      .then(res =>res.json())
      .then(data => {
        if(data.success){
            alaert("Log out successfull");
            loggedInStatus = false;
        }else{
            alert(`Log out not successfull ${data.message}`);
        }
      })
      .catch(err => console.error(err));
    

},false)