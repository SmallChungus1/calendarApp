
// This file is used to login and signup users

// Global Variables

const signup = document.getElementById("calSignUp");
const signout = document.getElementById("calLogin");
let display = 0;

const logOutBtn = document.getElementById("logOutBtn");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("searchBtn")
let isLogOut = true;

const addEventBtn = document.getElementById("addEventBtn");


// Event Listeners

document.getElementById("loginBtn").addEventListener("click", loginUser, false);
document.getElementById("signUpBtn").addEventListener("click", signUpUser, false);

function loginUser(event){
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginData = {'username': userName, 'password': password };

    fetch("login.php", {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers:{'content-type': 'application/json'}
    })
    .then(response=>response.json())
    // .then(loginData=> alert(loginData.success ? "Login Successful" : `Login not successful ${loginData.message}`))
    .then(loginData=> {
        if(loginData.success){
            alert(`Login Successful, ${loginData.message[0]}!`);
            document.getElementById("currUser").innerText=userName;
            loggedInStatus = true;
            isLogOut = false;
            hideShow();
            updateCalendar();
            refreshColorCalendar();
            activateShareOption();
            document.getElementById("eventCreateToken").value=loginData.message[1]; //the generated token
            document.getElementById("eventEditToken").value=loginData.message[1];
            logOutBtn.style.display = "block";
            searchInput.style.display = "block";
            searchBtn.style.display = "block";
            addEventBtn.disabled = false;
            editEventBtn.disabled = false;
        }else{
            alert(`Login not successful ${loginData.message}`);
        }
    }  
        )
    .catch(err => console.error(err));
}

/**
 * This function is used to hide and show the login and signup forms
 */

function hideShow() {
    const div = document.getElementById("calSignUp");
    const div2 = document.getElementById("calLogin");

    if (display == 1) {
        signup.style.display = "block";
        signout.style.display = "block";
        div.style.display = "block";
        div2.style.display = "block";
        display = 0;
    } else {
        signup.style.display = "none";
        signout.style.display = "none";
        div.style.display = "none";
        div2.style.display = "none";
        display = 1;
    }
  }

/**
 * This function is used to sign up a user
 */

function signUpUser(event){
    const userName = document.getElementById("usernameReg").value;
    const password = document.getElementById("passwordReg").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    console.log(passwordConfirm);
    const loginData = {'username': userName, 'password': password, 'password2' : passwordConfirm};
    // Sends the signup data to the signUp.php file
    fetch("signUp.php", {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers:{'content-type': 'application/json'}
    })
    .then(response=>response.json())
    .then(loginData=> {
        if(loginData.success){
            alert("SignUp Successful");
            loggedInStatus = true;
            document.getElementById("welcomeMsg").innerText="SignUp Successfull. Login to continue";
        }else{
            alert(`SignUp not successful ${loginData.message}`);
        }
    }  
        )
    .catch(err => console.error(err));
}