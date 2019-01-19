DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

USE user_db;

CREATE TABLE animals
(
	id int NOT NULL AUTO_INCREMENT,
    animal_name_common VARCHAR(100) NOT NULL,
    favorited BOOLEAN,
    animal_name_scientific VARCHAR(170) NOT NULL,
    threat VARCHAR(30) NOT NULL,
    pop INT(10),
    max_weight INT(10),
    habitat VARCHAR(200),
    info TEXT,
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

SELECT * FROM animals;
SELECT * FROM user;
SELECT * FROM merged;