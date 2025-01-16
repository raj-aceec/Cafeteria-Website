-- Schema for Coffee Database
CREATE DATABASE coffee;
USE coffee;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    city VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Admin Table
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insert default admin user
INSERT INTO admin (id, username, password) VALUES
(1, 'admin', 'admin123');

-- Orders Table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    item_name VARCHAR(255),
    tablename INT,
    quantity INT,
    price DECIMAL(10, 2),
    order_date DATE,
    status VARCHAR(255) DEFAULT 'pending',
    FOREIGN KEY (username) REFERENCES users(username)
);

-- Coffee Table
CREATE TABLE coffee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coffee_name VARCHAR(255),
    price DECIMAL(10, 2)
);

-- Insert sample coffee items
INSERT INTO coffee (coffee_name, price) VALUES
('Cafe Latte', 250),
('Cappucino', 350),
('Espresso', 300),
('Americano', 350);

-- Insert sample user
INSERT INTO users (id, name, email, city, username, password) VALUES
(1, 'user', 'user@email.com', 'USA', 'user123', 'user123');

-- Insert sample order
INSERT INTO orders (username, item_name, quantity, price, order_date) VALUES
('user123', 'Cafe Latte', 2, 250.00, CURDATE());

-- Select queries to verify data
SELECT * FROM users;
SELECT * FROM admin;
SELECT * FROM orders;
SELECT * FROM coffee;

-- Cleanup operations (optional)
TRUNCATE TABLE orders;
DROP TABLE orders;
