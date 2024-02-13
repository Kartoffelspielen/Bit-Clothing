// let attempts = 4;
let changeButton = document.getElementById("change_password");
let email = document.getElementById("forgot_email");
let securtiy_question = document.getElementById("security_questions");
let security_answer = document.getElementById("question_answer");
let new_pass1 = document.getElementById("new_password1");
let new_pass2 = document.getElementById("new_password2");

function reset_password(event) {
    event.preventDefault();
    if(new_pass1.value == new_pass2.value) {
        let xhr = new XMLHttpRequest;
        xhr.addEventListener("load", responseHandler);
        query = `email=${email.value}&security_question=${securtiy_question.value}&security_answer=${security_answer.value}&new_pass=${new_pass1.value}`;
        url = `/attempt_reset`;
        xhr.responseType = "json";
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(query);
    }
    else {
        //change hidden message innerHTML
    }
}

function responseHandler(){
    let message = document.getElementById("message");
    let display = document.getElementById("form_div");
    message.style.display = "block";
    display.hidden = true;
    if (this.response.success) {
        message.innerText = this.response.message;
    }
    else {
        //console.log(this.response.success);
        message.innerText = this.response.message;
    }
}

changeButton.addEventListener("click", reset_password);
