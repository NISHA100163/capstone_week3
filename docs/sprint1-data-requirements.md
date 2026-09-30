# Sprint 1 – Product Catalogue Data Requirements

## Core Required Data

The following data fields are required for the Product Catalogue because they are necessary to identify, organise, display and manage products.

- Product ID
- Product Name
- Brand
- Category
- SKU / Item Number
- Product Type
- Price
- Description
- Product Image
- Availability Status
- Created Date
- Updated Date

---

## Optional Product Data

Some products require additional information depending on their category.

- Subcategory
- Size
- Colour
- Model Number
- Storage Capacity
- Product Features
- Technical Specifications
- Collection / Range

---

## Promotional Data

The JB Hi-Fi investigation showed that some products require separate promotional price information.

- Regular Price
- Sale Price
- Discount Amount
- Promotion Status

---

## Availability and Fulfilment Data

The Bunnings and Kmart investigations showed that availability information can change depending on store, location and product status.

- Online Availability
- In-store Availability
- Click & Collect Availability
- Delivery Availability
- Delivery Cost
- Selected Store
- Postcode / Suburb

---

## Customer and System-Generated Data

The investigated systems also provide additional customer and system-generated information.

- Customer Rating
- Review Count
- Related Products
- Similar Products
- Wishlist Status
- Stock Notification
- Recommended Products

---

## Data Priority

### Must Have

- Product ID
- Product Name
- Brand
- Category
- SKU
- Product Type
- Price
- Description
- Product Image
- Availability Status

### Should Have

- Subcategory
- Model Number
- Size
- Colour
- Product Features
- Technical Specifications
- Sale Price
- Discount Amount
- Delivery Availability
- Click & Collect Availability

### Nice To Have

- Customer Ratings
- Customer Reviews
- Wishlist
- Stock Notifications
- Related Products
- Similar Products
- Product Visualisation
- Recommendation Features

---

## Findings

The industry investigation showed that all products require a common set of core data such as product name, brand, category, SKU, price and product image.

However, different product categories require different additional information. For example, furniture may require size or collection information, while technology products may require model number, storage, colour and technical specifications.

The Product Catalogue should therefore use a common core data structure while allowing optional fields for different product categories.

Availability and promotional information should also be separated from basic product information because this data may change more frequently.
