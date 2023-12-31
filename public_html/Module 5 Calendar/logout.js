
// This file is used to log the user out of the system

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
            clearSearchEvents();
            document.getElementById("currUser").innerText="";
            isLogOut = true;
            deactivateShareOption();
            loggedInStatus = false;
            logOutBtn.style.display = "none";
            searchInput.style.display = "none";
            searchBtn.style.display = "none";
            addEventBtn.disabled = true;
            editEventBtn.disabled = true;
        }else{
            alert(`Log out not successful ${data.message}`);
        }
      })
      .catch(err => console.error(err));
    

},false)

/*
* This function is used to hide or show the signup and logout buttons
*/

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

/*
* This function is used to toggle the login button
*/

function toggleLogin(){
  if (isLogOut) {
    // if the user is logged out, display the login button and disable the add event button
      logOutBtn.style.display = "block";
      addEventBtn.disabled = true;
      isLogOut = true;
      console.log("Displaying logout button");
  } else {
      logOutBtn.style.display = "none";
      addEventBtn.disabled = false;
      isLogOut = false;
      console.log("Hidding logout button");
  }
}