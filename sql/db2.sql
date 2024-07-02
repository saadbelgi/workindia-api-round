USE SCHEMA inshorts-workindia;

-- create tables
CREATE TABLE user (
	user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE TABLE short (
	short_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    publish_date DATETIME NOT NULL,
    content TEXT NOT NULL,
    content_link VARCHAR(512) NOT NULL,
    image VARCHAR(512),
    upvote INTEGER DEFAULT 0,
    downvote INTEGER DEFAULT 0
);

-- insert some users
-- password = abcd1234
INSERT INTO user(username, email, password) VALUES 
("saad", "abc@def.ghi", "$2b$10$8Hc6EQOVs.6sQ.qa7jXhPOB4xap0TLnqBxtc2djNkFz4aNeNSBipC"),
("arifa", "abd@def.ghi", "$2b$10$8Hc6EQOVs.6sQ.qa7jXhPOB4xap0TLnqBxtc2djNkFz4aNeNSBipC"),
("advait", "abe@def.ghi", "$2b$10$8Hc6EQOVs.6sQ.qa7jXhPOB4xap0TLnqBxtc2djNkFz4aNeNSBipC")
;

SELECT * FROM user;





