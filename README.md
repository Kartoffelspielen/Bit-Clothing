# CS2803-Final-Project
Final Project for CS2803 @ GaTech

Needed SQL script:

-- first have some database so that we can insert a table called user_info
create table user_info (
    username varchar(64) primary key not null,
    usr_password varchar(64) not null,
    email_addr varchar(64) not null,
    security_question varchar(64) not null,
    security_answer varchar(64) not null
);

-- (optional) you can use the database we created
drop database if exists cs2803_final_project;
create database cs2803_final_project;
use cs2803_final_project;