let registerButton = document.getElementById("register");
let emailAddress = document.getElementById("email_addr");
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm_password");
let securityQuestion = document.getElementById("security_questions");
let securityAnswer = document.getElementById("question_answer");

function register(event){
    event.preventDefault();
    if (password.value === confirmPassword.value){
        let xhr = new XMLHttpRequest;
        xhr.addEventListener("load", responseHandler);
        query=`username=${username.value}&password=${password.value}&email=${emailAddress.value}&question=${securityQuestion.value}&answer=${securityAnswer.value}`;

        url = `/register`;
        xhr.responseType = "json";
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(query);
    }
    else {
        message.style.display = "block";
        message.innerText = "passwords don't match";
    }

}

function responseHandler(){
    let message = document.getElementById("message");
    message.style.display = "block";
    if (this.response.success){
        message.innerText = this.response.message;
        window.location.href = "index.html";
    }
    else {
        console.log(this.response.success);
        message.innerText = this.response.message;
    }
}

registerButton.addEventListener("click", register)
