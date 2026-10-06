# Week 4 – Product Catalogue Data Dictionary



## Product Entity

| Attribute | Data Type | Key | Description |
|---|---|---|---|
| product_id | Integer | PK | Unique identifier for each product |
| brand_id | Integer | FK | Links the product to a brand |
| category_id | Integer | FK | Links the product to a category |
| product_name | Varchar |  | Stores the product name |
| sku | Varchar | Unique | Unique stock keeping unit for the product |
| price | Decimal |  | Stores the selling price |
| description | Text |  | Stores detailed product information |
| image_url | Varchar |  | Stores the product image location |
| created_date | Date |  | Records when the product was added |
| updated_date | Date |  | Records when the product was last updated |

## Brand Entity

| Attribute | Data Type | Key | Description |
|---|---|---|---|
| brand_id | Integer | PK | Unique identifier for each brand |
| brand_name | Varchar |  | Stores the brand name |

## Category Entity

| Attribute | Data Type | Key | Description |
|---|---|---|---|
| category_id | Integer | PK | Unique identifier for each category |
| category_name | Varchar |  | Stores the category name |

## ProductVariant Entity

| Attribute | Data Type | Key | Description |
|---|---|---|---|
| variant_id | Integer | PK | Unique identifier for each product variant |
| product_id | Integer | FK | Links the variant to a product |
| size | Varchar |  | Stores size information where required |
| colour | Varchar |  | Stores colour information |
| model_number | Varchar |  | Stores model information for technical products |

## Store Entity

| Attribute | Data Type | Key | Description |
|---|---|---|---|
| store_id | Integer | PK | Unique identifier for each store |
| store_name | Varchar |  | Stores the store name |
| location | Varchar |  | Stores the store location |



## Inventory Entity

| Attribute | Data Type | Key | Description |
|---|---|---|---|
| inventory_id | Integer | PK | Unique identifier for each inventory record |
| product_id | Integer | FK | Links inventory to a product |
| store_id | Integer | FK | Links inventory to a store |
| stock_quantity | Integer |  | Stores available stock quantity |
| availability_status | Varchar |  | Shows product availability at the selected store |
