CREATE DATABASE user_db;

USE user_db;

CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
	favorite_animals VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES poster(id)
);