// Global Variables

const signup = document.getElementById("calSignUp");
const signout = document.getElementById("calLogin");
let display = 0;

const logOutBtn = document.getElementById("logOutBtn");
let isLogOut = true;

const addEventBtn = document.getElementById("addEventBtn");

// Event Listeners

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
            //document.getElementById("welcomeMsg").innerText="Welcome, "+userName;
            document.getElementById("currUser").innerText=userName;
            loggedInStatus = true;
            isLogOut = false;
            hideShow();
            updateCalendar();
            //handleClick();
            refreshColorCalendar();
            document.getElementById("eventCreateToken").value=loginData.message[1]; //the generated token
            document.getElementById("eventEditToken").value=loginData.message[1];
            logOutBtn.style.display = "block";
            addEventBtn.disabled = false;
          //  toggleLogin();
            // document.getElementById("calLogin").remove();
            // document.getElementById("calSignUp").remove();
        }else{
            alert(`Login not successful ${loginData.message}`);
        }

    }  
        )
    .catch(err => console.error(err));
}

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


function signUpUser(event){
    const userName = document.getElementById("usernameReg").value;
    const password = document.getElementById("passwordReg").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    console.log(passwordConfirm);
    const loginData = {'username': userName, 'password': password, 'password2' : passwordConfirm};

    fetch("signUp.php", {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers:{'content-type': 'application/json'}
    })
    .then(response=>response.json())
    // .then(loginData=> alert(loginData.success ? "Login Successful" : `Login not successful ${loginData.message}`))
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


function hideshow(){

    const div = document.getElementById("calSignUp");
        const div2 = document.getElementById("calLogin");

        let display = 0;
        function hideShow() {
            if (display == 1) {
                div.style.display = "block";
                div2.style.display = "block";
                display = 0;
            } else {
                div.style.display = "none";
                div2.style.display = "none";
                display = 1;
            }
        }
}
document.getElementById("loginBtn").addEventListener("click", loginUser, false);

document.getElementById("signUpBtn").addEventListener("click", signUpUser, false);
