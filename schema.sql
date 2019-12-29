CREATE DATABASE company_db;
USE company_db;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	department_name varchar (30),
	PRIMARY KEY (id)
);

create table e_role (
    id int not null AUTO_INCREMENT,
    title varchar(30) not null,
    salary decimal,
    department_id int,
    PRIMARY KEY (id)
);

create table employee
(
   id int not null AUTO_INCREMENT,
   first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY (id)

);