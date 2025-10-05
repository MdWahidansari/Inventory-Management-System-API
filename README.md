
# Inventory Management System API
## Overview
This project is a **backend-focused Inventory Management System API** built with **Node.js, Express.js, and MongoDB**. It is designed to help manage warehouse products efficiently. You can create, update, delete products, manage stock quantities, and identify products that are running low on stock.

**Key Features:**
- Full CRUD operations for products  
- Safe stock management: increase or decrease product quantity  
- Low-stock alerts for better inventory control  
- Proper error handling to prevent invalid operations (e.g., decreasing stock below zero)  
## Setup & Run Locally
*Prerequisites:*
- Node.js installed  
- MongoDB running locally or accessible via a connection URI  
- Git installed  
**Steps to run the project:**
1. Clone the repository:  
```bash
git clone https://github.com/<YOUR_USERNAME>/Inventory-Management-System-API.git

cd Inventory-Management-System-API/Backend

npm install

-> Create a .env file in the root folder and add your environment variables:
MONGO_URI=<your_mongodb_connection_string>
PORT=5000

-> Start the server:
npm run dev

**Running Tests**
*-This project uses Jest for unit testing inventory operations. To run tests-*

npm test

**Assumptions & Design Choices**

-> Used OOP approach for InventoryService to separate stock management logic from controllers.
-> Used MongoDB with Mongoose for database operations.
-> Controllers handle HTTP requests and return JSON responses.
-> Assumes stock_quantity and low_stock_threshold are non-negative numbers.
-> .env is used for configurable environment variables.
-> Unit tests mock Mongoose models to avoid database dependency during testing.
=======

