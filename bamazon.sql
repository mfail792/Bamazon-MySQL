DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
item_id INTEGER(100),
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) DEFAULT 0,
stock_quantity INTEGER(100) DEFAULT 0,
PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (11, "Dogs", "Back", 37.55, 16), (21, "Ants", "Back", 14.32, 66), (43, "Cats", "Front", 2.66, 403), (33, "Frogs", "Back", 1.14, 5), (51, "TV's", "Front", 6.76, 20), (72, "Burgers", "Front", 1.11, 200), (61, "Blankets", "Back", 3.41, 75), (88, "Flowers", "Front", 2.65, 70),
(90, "Goats", "Front", 22.55, 52), (49, "Crayons", "Back", 4.56, 18);

SELECT * FROM products;


