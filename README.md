# Simple E-commerce

A simple e-commerce with auth and cart & orders.

Used socket.io for auto update stock in real time.


# Minimum Requirements
1. Node 18 or above


# How to run
1. Open vs code terminal ctrl+shift+`

## Backend

1. cd backend
2. npm install
3. copy .env.example .env (update DB_URI if need)
4. npm run seeder
5. npm start

## Frontend

1. cd frontend
2. npm install
3. copy .env.example .env (update DB_URI if need)
4. npm run dev


# Update stock
You can update stock from API call manually.

Endpoint Like: http://localhost:4000/api/product/updateStock/:productID

body: {
  "stock": 0
}

its open for now.