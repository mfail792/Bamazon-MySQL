CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
item_id INTEGER(11),
product_name VARCHAR(50),
department_name  VARCHAR(50),
price DECIMAL(10,2),
stock_quantity INT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (item_id)
VALUES (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

INSERT INTO products (product_name)
VALUES ("scissors", "melons", "earrings", "goats", "turtles", "vipers", "laptops", "mice", "candles", "buckets")

INSERT INTO products (department_name)
VALUES ("isle 5", "section 4", "station 3", "endcap 1")

INSERT INTO products (price)
VALUES (3.22, 4.19, 7.13, 2.00, 14.00, 15.76, 1.37)

INSERT INTO products (stock_quantity)
VALUES (4, 13, 3, 10, 9, 23, 1, 49)
