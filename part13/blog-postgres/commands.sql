CREATE TABLE blogs(id SERIAL PRIMARY KEY, title text NOT NULL, author text, url text NOT NULL, likes integer NOT NULL DEFAULT 0);
insert into blogs (title, url, author) values ('How to Run Express App', 'https://google.com', 'Song Haochen');
insert into blogs (title, url, author) values ('Dive into Machine Learning', 'https://example.com', 'Song Chenhao');
