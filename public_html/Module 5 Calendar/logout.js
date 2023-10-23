

logOutBtn.addEventListener("click", ()=>{
  
  const userName = document.getElementById("currUser").innerText;

  const data = {"username": userName}
    fetch("logout.php",{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'content-type': 'application/json'}
      })
      .then(res =>res.json())
      .then(data => {
        if(data.success){
            alert("Log out successful");
            alert(data.message);
            cleardisplayEvents();
            updateCalendar();
            clearEventList();
            
            hideShow();
            
            document.getElementById("currUser").innerText="";
            isLogOut = true;

            loggedInStatus = false;
            logOutBtn.style.display = "none";
          //  toggleLogin();
        }else{
            alert(`Log out not successful ${data.message}`);
        }
      })
      .catch(err => console.error(err));
    

},false)

function hideShow() {
  if (display == 1) {
      signup.style.display = "block";
      signout.style.display = "block";
      display = 0;
      console.log("display = 0");
  } else {
      signup.style.display = "none";
      signout.style.display = "none";
      display = 1;
      console.log("display = 1");
  }
}

function toggleLogin(){
  if (isLogOut) {
      logOutBtn.style.display = "block";
      isLogOut = true;
      console.log("Displaying logout button");
  } else {
      logOutBtn.style.display = "none";
      isLogOut = false;
      console.log("Hidding logout button");
  }
}