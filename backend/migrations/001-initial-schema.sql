-- Up
CREATE TABLE Category (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE Movie (id INTEGER PRIMARY KEY, categoryId INTEGER, title TEXT, descriptiontext TEXT,
  CONSTRAINT Movie_fk_categoryId FOREIGN KEY (categoryId)
    REFERENCES Category (id) ON UPDATE CASCADE ON DELETE CASCADE);
INSERT INTO Category (id, name) VALUES (1, 'Comedy');
INSERT INTO Category (id, name) VALUES (2, 'Fantasy');
INSERT INTO Category (id, name) VALUES (3, 'Thriller');

-- Down 
DROP TABLE Movie;
DROP TABLE Category;