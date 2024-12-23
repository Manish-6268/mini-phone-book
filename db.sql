-- Create  database
CREATE DATABASE phonebook;

-- Use database
USE phonebook;

--  table
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40),
    phone_number VARCHAR(14),
    address VARCHAR(70)
);
