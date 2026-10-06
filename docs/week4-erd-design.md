# Week 4 – Product Catalogue ERD Design

## Week 2 and Week 3 Findings

The earlier data investigation showed that the Product Catalogue requires core product information such as product name, brand, SKU, category, price, description, image and availability.

The industry investigation also showed that different product categories may require additional information such as size, colour, model number and technical specifications.

These findings were used to develop the database design.

---

## Project Entities

The main entities identified for the Product Catalogue are:

1. Product
2. Brand
3. Category
4. ProductVariant
5. Store
6. Inventory

---

## Entity Attributes

### Product
- product_id (PK)
- brand_id (FK)
- category_id (FK)
- product_name
- sku
- price
- description
- image_url
- availability_status

### Brand
- brand_id (PK)
- brand_name

### Category
- category_id (PK)
- category_name

### ProductVariant
- variant_id (PK)
- product_id (FK)
- size
- colour
- model_number

### Store
- store_id (PK)
- store_name
- location

### Inventory
- inventory_id (PK)
- product_id (FK)
- store_id (FK)
- stock_quantity

---

## Business Rules

1. Every product must have a unique Product ID.
2. Every product must belong to one brand.
3. Every product must belong to one category.
4. One brand can have many products.
5. One category can contain many products.
6. One product can have multiple product variants.
7. Each product variant belongs to one product.
8. One product can have inventory records in multiple stores.
9. One store can contain inventory records for multiple products.
10. Each inventory record stores the stock quantity for one product at one store.

---

## Relationship Mapping

- Brand 1 : M Product
- Category 1 : M Product
- Product 1 : M ProductVariant
- Product 1 : M Inventory
- Store 1 : M Inventory

---

## How the ERD Supports Backend Development

The ERD provides a structured database design for backend development.

Primary keys uniquely identify each record, while foreign keys connect related entities.

The structure can support:

- Product creation and retrieval
- Category-based filtering
- Brand-based filtering
- Product variants
- Store-based availability
- Inventory management
- Stock quantity updates

This database structure provides a foundation for implementing the Product Catalogue backend.
