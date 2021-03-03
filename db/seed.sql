DROP TABLE IF EXISTS helo_posts;
DROP TABLE IF EXISTS helo_users;

CREATE TABLE helo_users
(
  id SERIAL PRIMARY KEY,
  USER_NAME VARCHAR (50) UNIQUE NOT NULL,
  PASSWORD VARCHAR (900) NOT NULL,
  profile_pic TEXT
);

CREATE TABLE helo_posts
(
  id SERIAL PRIMARY KEY,
  title VARCHAR (100),
  content text,
  img text,
  FOREIGN KEY (id)
      REFERENCES helo_users (id),
  date_created TIMESTAMP
);