
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
      console.error("Database error:", err.message);
    } else {
      console.log("Connected to Product Catalogue database");
      db.run("PRAGMA foreign_keys = ON");
    }
  }
);

// Home page
app.get("/", (req, res) => {
  res.send("Product Catalogue Backend Server is Running!");
});

// Retrieve all products
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Manish's Sprint 3 feature: Add a product
app.post("/api/products", (req, res) => {
  const {
    product_name,
    description,
    price,
    stock_quantity,
    category_id,
    supplier_id
  } = req.body;

  if (
    typeof product_name !== "string" ||
    !product_name.trim() ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isSafeInteger(stock_quantity) ||
    stock_quantity < 0 ||
    !Number.isSafeInteger(category_id) ||
    category_id <= 0 ||
    !Number.isSafeInteger(supplier_id) ||
    supplier_id <= 0
  ) {
    return res.status(400).json({
      error: "Invalid product information"
    });
  }

  const sql = `
    INSERT INTO products
    (product_name, description, price, stock_quantity,
     category_id, supplier_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      product_name.trim(),
      description ?? null,
      price,
      stock_quantity,
      category_id,
      supplier_id
    ],
    function (err) {
      if (err) {
        return res.status(400).json({
          error: "Unable to add product. Check category and supplier IDs."
        });
      }

      res.status(201).json({
        message: "Product added successfully",
        product_id: this.lastID
      });
    }
  );
});

// Manish's Sprint 3 feature: Update product stock
app.put("/api/products/:id/stock", (req, res) => {
  const productId = Number(req.params.id);
  const { stock_quantity } = req.body;

  if (
    !Number.isSafeInteger(productId) ||
    productId <= 0 ||
    !Number.isSafeInteger(stock_quantity) ||
    stock_quantity < 0
  ) {
    return res.status(400).json({
      error: "Invalid product ID or stock quantity"
    });
  }

  db.run(
    "UPDATE products SET stock_quantity = ? WHERE product_id = ?",
    [stock_quantity, productId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Stock update failed" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({
        message: "Stock updated successfully",
        product_id: productId,
        stock_quantity
      });
    }
  );
});

 // Manish's Sprint 3 contribution: Low stock inventory report
app.get("/api/products/low-stock", (req, res) => {
  const limit = req.query.limit === undefined
    ? 20
    : Number(req.query.limit);

  if (!Number.isSafeInteger(limit) || limit < 0) {
    return res.status(400).json({
      error: "Stock limit must be a non-negative integer"
    });
  }

  const sql = `
    SELECT product_id, product_name, price, stock_quantity
    FROM products
    WHERE stock_quantity <= ?
    ORDER BY stock_quantity ASC, product_id ASC
  `;

  db.all(sql, [limit], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Unable to retrieve low-stock products"
      });
    }

    res.json({
      stock_limit: limit,
      total_products: rows.length,
      products: rows
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
