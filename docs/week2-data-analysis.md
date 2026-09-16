# Capstone B – Week 2
## Understanding the Data Behind Our Project

### Project
Secure Retail System

### Module
Product Catalogue

---

## 1. Review of Existing MVP

During Capstone A, our team developed a frontend MVP for the Secure Retail System. The existing system will be reviewed to identify the information currently displayed, entered and used within the Product Catalogue and related system features.

---

## 2. Project Data Inventory

## 2. Project Data Inventory

The following inventory identifies the main data required by the Secure Retail System, with a primary focus on the Product Catalogue module.

| Data Element | Description | Data Type | Source | Created/Entered By | Used By | Required |
|---|---|---|---|---|---|---|
| Product ID | Unique identifier for each product | Integer | System | System | Catalogue, Admin, Cart | Yes |
| Product Name | Name of the product | Text | Product Form | Admin | Customer, Admin | Yes |
| SKU | Unique stock/product code | Text | Product Form | Admin | Admin, System | Yes |
| Brand | Product brand | Text | Product Form | Admin | Customer, Admin | No |
| Category | Group the product belongs to | Text / ID | Product Form | Admin | Customer, System | Yes |
| Description | Detailed product information | Text | Product Form | Admin | Customer | Yes |
| Price | Selling price of the product | Decimal | Product Form | Admin | Customer, Cart | Yes |
| Stock Quantity | Number of items available | Integer | Inventory | Admin/System | Admin, Catalogue | Yes |
| Product Image | Image associated with the product | File Path / URL | Product Form | Admin | Customer | No |
| Product Status | Active, inactive or out of stock | Text / Boolean | System/Admin | System/Admin | Catalogue | Yes |
| Search Keyword | Text entered to search products | Text | User Input | Customer | Search Function | No |
| Selected Category | Category selected by the customer | Text / ID | User Input | Customer | Filter Function | No |
| Cart Quantity | Number of units selected | Integer | User Input | Customer | Cart | Yes when added |
| Customer Email | Email used for account/login | Text | User Input | Customer | Login/Account | Yes |
| Password | Customer authentication credential | Encrypted Text | User Input | Customer | Authentication | Yes |
| Contact Name | Name entered in contact form | Text | User Input | Customer | Admin/Support | Yes |
| Contact Email | Email entered in contact form | Text | User Input | Customer | Admin/Support | Yes |
| Contact Message | Customer enquiry | Text | User Input | Customer | Admin/Support | Yes |
| Created Date | Date a record was created | Date/Time | System | System | Admin/System | Yes |
| Updated Date | Date a record was last modified | Date/Time | System | System | Admin/System | Yes |

---

---

## 3. Data Sources and Responsibilities

To be completed.

---

## 4. Data Flow Diagram

To be completed.

---

## 5. Important Business Information

To be completed.

---

## 6. Data Quality and Integrity Risks

To be completed.

---

## 7. Data Requirements for Future Development

To be completed.
