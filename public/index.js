let loginButton = document.getElementById("login")
let username = document.getElementById("username")
let user_password = document.getElementById("password")

function login(event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", responseHandler);
    query=`username=${username.value}&password=${user_password.value}`;

    url = `/attempt_login`;
    xhr.responseType = "json";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(query);
}

//this is not really needed
function responseHandler() {
    let message = document.getElementById("message");
    message.style.display = "block";
    if (this.response.success){
        message.innerText = this.response.message;
        window.location.href = "home.html";
    }
    else {
        console.log(this.response.success);
        console.log(this.response.message);
        message.innerText = this.response.message;
    }
}

loginButton.addEventListener("click", login)
