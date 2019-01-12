DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

USE user_db;

CREATE TABLE animals
(
	id int NOT NULL AUTO_INCREMENT,
    animal_name VARCHAR(150) NOT NULL,
    favorited BOOLEAN,
    threat_level VARCHAR(30) NOT NULL,
    pop_trend VARCHAR(30),
    user_post TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
	favorite_animals VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE merged
(
    merge_id int NOT NULL AUTO_INCREMENT,
    userid int NOT NULL,
    animalsid int NOT NULL,
    FOREIGN KEY (animalsid) REFERENCES animals(id),
    FOREIGN KEY (userid) REFERENCES user(id),
    PRIMARY KEY (merge_id)
);