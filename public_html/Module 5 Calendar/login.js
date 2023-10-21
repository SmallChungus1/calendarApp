
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
    .then(loginData=> alert(loginData.success ? "Login Successful" : `Login not successful ${loginData.message}`))
    .catch(err => console.error(err));
}

document.getElementById("loginBtn").addEventListener("click", loginUser, false);