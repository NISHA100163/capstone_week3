
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS suppliers (
    supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_name TEXT NOT NULL,
    email TEXT,
    phone TEXT
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER,
    supplier_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);


-- Insert sample categories
INSERT OR IGNORE INTO categories
(category_id, category_name, description)
VALUES
(1, 'Computers', 'Laptops and desktop computers'),
(2, 'Accessories', 'Computer accessories'),
(3, 'Electronics', 'Electronic devices');

-- Insert sample suppliers
INSERT OR IGNORE INTO suppliers
(supplier_id, supplier_name, email, phone)
VALUES
(1, 'Tech Supplies Australia', 'sales@tech.example', '0290001001'),
(2, 'Digital Wholesale', 'info@digital.example', '0290001002'),
(3, 'Smart Electronics', 'support@smart.example', '0290001003');

-- Insert sample products
INSERT OR IGNORE INTO products
(product_id, product_name, description, price,
 stock_quantity, category_id, supplier_id)
VALUES
(1, 'Laptop', '15-inch laptop', 1200.00, 15, 1, 1),
(2, 'Keyboard', 'Wireless keyboard', 75.00, 30, 2, 2),
(3, 'Mouse', 'Wireless mouse', 45.00, 40, 2, 2),
(4, 'Monitor', '24-inch monitor', 250.00, 20, 1, 1),
(5, 'Headphones', 'Bluetooth headphones', 150.00, 25, 3, 3);

