1. Project Description
This project is a backend-heavy Inventory Management System API built using Node.js, Express.js, and MongoDB.
It allows you to manage products in a warehouse, including creating, updating, deleting products, managing stock quantities, and fetching products below a low-stock threshold.

Core Features:
-> CRUD operations for products.
-> Stock management: increase and decrease stock safely.
-> Low-stock product detection.
-> Error handling for invalid operations (e.g., decreasing stock below 0).

2. Setup & Run Locally
Prerequisites:
Node.js installed
MongoDB running locally or a MongoDB URI
Git installed

Steps:
-> Clone the repository:
-> git clone https://github.com/<YOUR_USERNAME>/Inventory-Management-System-API.git
-> cd Inventory-Management-System-API/Backend
-> Install dependencies:
npm install
Create a .env file in the root folder 
and add:
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
Start the server:
npm run dev

3. Run Test Cases
The project uses Jest for unit testing the Inventory operations.
To run tests:
npm test

4. Assumptions & Design Choices
-> Used OOP approach for InventoryService to separate stock management logic from controllers.
-> Used MongoDB with Mongoose for database operations.
-> Controllers handle HTTP requests and return JSON responses.
-> Assumes stock_quantity and low_stock_threshold are non-negative numbers.
-> .env is used for configurable environment variables.
-> Unit tests mock Mongoose models to avoid database dependency during testing.
