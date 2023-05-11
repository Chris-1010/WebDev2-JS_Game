DROP TABLE IF EXISTS players;

CREATE TABLE players
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mode VARCHAR(10),
    name CHAR(3),
    score INTEGER(5),
    enemy_count INTEGER(4),
    time_alive VARCHAR(7)
    );


SELECT *
FROM players;