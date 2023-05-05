DROP TABLE IF EXISTS pets;

CREATE TABLE pets(
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    kind TEXT
);

