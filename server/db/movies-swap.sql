DROP TABLE IF EXISTS liked_movies_users;
DROP TABLE IF EXISTS disliked_movies_users;
DROP TABLE IF EXISTS seen_movies_users;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    api_id INT UNIQUE
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) on DELETE CASCADE,
    befriended_id INT REFERENCES users(id) on DELETE CASCADE
);

CREATE TABLE liked_movies_users (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) on DELETE CASCADE,
    movie_id INT REFERENCES movies(id) on DELETE CASCADE
);

CREATE TABLE disliked_movies_users (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) on DELETE CASCADE,
    movie_id INT REFERENCES movies(id) on DELETE CASCADE
);

CREATE TABLE seen_movies_users (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) on DELETE CASCADE,
    movie_id INT REFERENCES movies(id) on DELETE CASCADE
);