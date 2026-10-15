
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(
  path.join(__dirname, "database.db"),
  (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
    } else {
      console.log("Connected to Product Catalogue database");
    }
  }
);

// Home route
app.get("/", (req, res) => {
  res.send("Product Catalogue Backend Server is Running!");
});

// Get all products from database
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to retrieve products"
      });
    }

    res.json(rows);
  });
});

// Get all product categories
app.get("/api/categories", (req, res) => {
  const sql = "SELECT * FROM categories";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to retrieve categories"
      });
    }

    res.json(rows);
  });
});

// Kritika's Sprint 3 contribution:
// Filter products by category ID
app.get("/api/products/category/:categoryId", (req, res) => {
  const categoryId = Number(req.params.categoryId);

  if (!Number.isSafeInteger(categoryId) || categoryId <= 0) {
    return res.status(400).json({
      error: "Invalid category ID"
    });
  }

  const sql = `
    SELECT
      p.product_id,
      p.product_name,
      p.description,
      p.price,
      p.stock_quantity,
      c.category_name
    FROM products p
    JOIN categories c
      ON p.category_id = c.category_id
    WHERE p.category_id = ?
  `;

  db.all(sql, [categoryId], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to filter products"
      });
    }

    res.json({
      category_id: categoryId,
      total_products: rows.length,
      products: rows
    });
  });
});

// Start backend server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

