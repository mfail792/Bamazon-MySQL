USE bamazonDB;

CREATE TABLE products (
id INT AUTO_INCREMENT NOT NULL,
item_id VARCHAR(10),
product_name VARCHAR(50),
department_name  VARCHAR(50),
price DECIMAL(10,2),
stock_quantity INT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (11, "dogs", "zone 3", 37.55, 16), (21, "ants", "zone 4", 14.32, 66), (43, "cats", "zone 6", 2.66, 403), (33, "frogs", "zone 3", 1.14, 5), (51, "TV's", "zone 7", 6.76, 20), (72, "burgers", "zone 1", 1.11, 200), (61, "noses", "zone 14", 3.41, 75), (88, "flowers", "zone 13", 2.65, 70),
(90, "goats", "zone 8", 22.55, 80), (100, "crayons", "zone 2", 4.50, 18);

