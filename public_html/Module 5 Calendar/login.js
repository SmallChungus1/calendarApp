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
            alert(`Login Successful ${loginData.message}`);
            document.getElementById("welcomeMsg").innerText="Welcome, "+userName;
            document.getElementById("currUser").innerText=userName;
            document.getElementById("calLogin").remove();
            document.getElementById("calSignUp").remove();
        }else{
            alert(`Login not successful ${loginData.message}`);
        }

    }  
        )
    .catch(err => console.error(err));
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
            document.getElementById("welcomeMsg").innerText="SignUp Successfull. Login to continue";

        }else{
            alert(`SignUp not successful ${loginData.message}`);
        }
    
    }  
        )
    .catch(err => console.error(err));
}

document.getElementById("loginBtn").addEventListener("click", loginUser, false);

document.getElementById("signUpBtn").addEventListener("click", signUpUser, false);
