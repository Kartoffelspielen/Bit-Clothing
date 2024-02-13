const express = require("express");
const res = require("express/lib/response");
// const { json } = require("express/lib/response"); this is not needed he just copied and pasted from zybooks
const bcrypt = require("bcryptjs");
const costFactor = 10;
let authenticated = false;

const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Katy_Cat_1984',
    database: 'cs2803_final_project'
});

//test connection to sql
conn.connect(function(err) {
    if(err) {
        console.log("Failure in connecting to sql server: ", err);
    }
    else {
        console.log("Connection established");
    }
});

const app = express();

app.use(express.static("public"));

/*
app.get("/registration", function(req, res){
    console.log("get registration page");
    res.sendFile(__dirname + "/public/" + "registration.html");
});*/

app.use(express.urlencoded({extended:false})); //not sure ewhat this does

app.post("/register", function(req, res){
    // we check to see if username is available
    usernameQuery = "Select username from user_info where username = ?"
    conn.query(usernameQuery, [req.body.username], function(err, rows){
        if(err){
            res.json({success: false, message: "server error"})
        }
        // we check to see if the username is already taken
        if (rows.length > 0){
            res.json({success: false, message: "username taken"})
        }
        // if it isn't, we insert the user into database
        else{
            // we create a password hash before storing the password
            passwordHash = bcrypt.hashSync(req.body.password, costFactor);
            insertUser = "insert into user_info values(?, ?, ?, ?, ?)"
            conn.query(insertUser, [req.body.username, passwordHash, req.body.email, req.body.question, req.body.answer], function(err, rows){
                if (err){
                    console.log(err);
                    res.json({success: false, message: "server error"})
                }
                else{
                    res.json({success: true, message: "user registered"})
                }
            })
        }
    });
})

app.post("/attempt_login", function(req, res) {
    // we check for the username and password to match.
    conn.query("select usr_password from user_info where username = ?", [req.body.username], function (err, rows) {
        if(err) {
            res.json({success: false, message: "user doesn't exist"});
        }
        else if (rows.length > 0) {
            storedPassword = rows[0].usr_password; // rows is an array of objects e.g.: [ { password: '12345' } ]
            // bcrypt.compareSync let's us compare the plaintext password to the hashed password we stored in our database
            //console.log(storedPassword);
            console.log(storedPassword, req.body.password);
            if(bcrypt.compareSync(req.body.password, storedPassword)) {
                authenticated = true;
                res.json({success: true, message: "logged in"});
            }
            else {
                console.log(authenticated);
                res.json({success: false, message: "password is incorrect"});
            }
        }
        else {
            res.json({success: false, message:"username is incorrect"});
        }
    });
});

app.post("/attempt_reset", function(req, res) {
    conn.query("select security_question, security_answer from user_info where email_addr = ?", [req.body.email], function(err, rows) {
        if(err) {
            res.json({success: false, message: "email doesn't exist"});
        }
        else if(rows.length == 1) {
            //console.log(rows[0].security_question == req.body.security_question, rows[0].security_answer == req.body.security_answer);
            if(rows[0].security_question == req.body.security_question && rows[0].security_answer == req.body.security_answer) {
                let new_encrpt_pass = bcrypt.hashSync(req.body.new_pass);
                conn.query("update user_info set usr_password = ? where email_addr = ?", [new_encrpt_pass, req.body.email], function(err, rows) {
                    if(err) {
                        res.json({success: false, message: "Bad answer"});
                    }
                    else {
                        console.log("YAY WE UPDATED PASSWORD");
                        res.json({success: true, message: "Successful Password Change!"});
                    }
                });
            }
            else {
                console.log(rows[0].security_question, req.body.security_question, rows[0].security_answer == req.body.security_answer);
                res.json({success: false, message: "Your security question/answer is incorrect"});
            }
        }
        else {
            res.json({success: false, message: "Email does not exist in the database"});
        }
    });
});

app.get("/", function(req, res){
    if(authenticated) {
        authenticated = false;
        res.send("<p>not logged in <p><a href='/'>login page</a>")
    }
    else {
        res.sendFile(__dirname + "/public/" + "index.html");
    }

})

app.listen(3002, function() {
   console.log("Listening on port 3002...");
});
