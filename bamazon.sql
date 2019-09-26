USE bamazonDB;

CREATE TABLE products (
id INT AUTO_INCREMENT NOT NULL,
item_id VARCHAR(5),
product_name VARCHAR(50),
department_name  VARCHAR(50),
price DECIMAL(10,2),
stock_quantity INT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name)
VALUES ("SCI", "MNS", "EAR", "GTS", "TRT", "VPS", "LPS", "MCE", "CND", "BCK");

INSERT INTO products (product_name)
VALUES ("scissors", "melons", "earrings", "goats", "turtles", "vipers", "laptops", "mice", "candles", "buckets");

INSERT INTO products (department_name)
VALUES ("isle 5", "section 4", "station 3", "endcap 1");

INSERT INTO products (price)
VALUES (3.22, 4.19, 7.13, 2.00, 14.00, 15.76, 1.37);

INSERT INTO products (stock_quantity)
VALUES (4, 13, 3, 10, 9, 23, 1, 49);
