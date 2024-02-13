drop database if exists cs2803_final_project;

create database cs2803_final_project;

use cs2803_final_project;

create table user_info (
    username varchar(64) primary key not null,
    usr_password varchar(64) not null,
    email_addr varchar(64) not null,
    security_question varchar(64) not null,
    security_answer varchar(64) not null
);

select * from user_info;
