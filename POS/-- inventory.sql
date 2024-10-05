-- inventory.sql
CREATE TABLE inventory (
    product_id SERIAL PRIMARY KEY,
    rfid_tag VARCHAR(128) UNIQUE NOT NULL,
    product_name VARCHAR(255),
    quantity INT DEFAULT 0,
    location VARCHAR(255),
    expiration_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
