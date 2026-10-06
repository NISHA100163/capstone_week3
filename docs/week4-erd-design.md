# Week 4 – Product Catalogue ERD Design

## Week 2 and Week 3 Findings

The earlier data investigation showed that the Product Catalogue requires core product information such as product name, brand, SKU, category, price, description, image and availability.

The industry investigation also showed that different product categories may require additional information such as size, colour, model number and technical specifications.

These findings were used to develop the database design.

---

## Entity Attributes

### Product
- product_id (PK)
- brand_id (FK)
- category_id (FK)
- product_name
- sku (Unique)
- price
- description
- image_url
- created_date
- updated_date

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
- availability_status

---

## Business Rules

1. Every product must have a unique Product ID.
2. Every product must have a unique SKU.
3. Every product must belong to one brand.
4. Every product must belong to one category.
5. One brand can have many products.
6. One category can contain many products.
7. One product can have multiple product variants.
8. Each product variant belongs to one product.
9. One product can be available in multiple stores.
10. One store can contain inventory records for multiple products.
11. Each inventory record must belong to one product and one store.
12. Each Product–Store combination should have only one inventory record.
13. Stock quantity is stored for each Product–Store combination.
14. Availability status is stored at inventory level because availability may differ between stores.
15. Created date records when a product is added to the system.
16. Updated date records the most recent modification to the product.
17. Availability status is stored at inventory level because product availability may differ between stores.

---

## Relationship Mapping

- Brand 1 : M Product
- Category 1 : M Product
- Product 1 : M ProductVariant
- Product 1 : M Inventory
- Store 1 : M Inventory

Inventory acts as the link between Product and Store and stores the stock quantity and availability of a product at a particular store.

---

## How the ERD Supports Backend Development

The ERD provides a structured database design for implementing the Product Catalogue backend.

Primary keys uniquely identify each database record, while foreign keys maintain relationships between entities.

The database structure can support:

- Product creation and retrieval
- Category-based product filtering
- Brand-based product filtering
- Product variants such as size, colour and model
- Store-specific product availability
- Inventory and stock management
- Product stock updates
- Unique SKU identification
- Product creation and modification tracking

The separation of Product and Inventory data also allows the same product to have different stock quantities and availability statuses across different stores.

---

## ERD

```mermaid
erDiagram

    BRAND ||--o{ PRODUCT : has
    CATEGORY ||--o{ PRODUCT : contains
    PRODUCT ||--o{ PRODUCT_VARIANT : has
    PRODUCT ||--o{ INVENTORY : has
    STORE ||--o{ INVENTORY : contains

    BRAND {
        int brand_id PK
        string brand_name
    }

    CATEGORY {
        int category_id PK
        string category_name
    }

    PRODUCT {
        int product_id PK
        int brand_id FK
        int category_id FK
        string product_name
        string sku
        decimal price
        string description
        string image_url
        date created_date
        date updated_date
    }

    PRODUCT_VARIANT {
        int variant_id PK
        int product_id FK
        string size
        string colour
        string model_number
    }

    STORE {
        int store_id PK
        string store_name
        string location
    }

    INVENTORY {
        int inventory_id PK
        int product_id FK
        int store_id FK
        int stock_quantity
        string availability_status
    }
