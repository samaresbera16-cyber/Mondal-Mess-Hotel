# Mondal Mess & Hotel — Meal & Billing Management

A full-stack MERN starter for managing mess customers, meal prices, meal entries, payments and monthly billing.

## Requirements
- Node.js 18+
- MongoDB local or MongoDB Atlas

## Setup
1. Extract the ZIP.
2. Open the project folder in VS Code.
3. In a terminal run `npm install` (root installs concurrently and scripts).
4. Copy `server/.env.example` to `server/.env` and fill in MongoDB URI and JWT secret.
5. Create the first admin: `npm run seed:admin --prefix server`
6. Start both apps: `npm run dev` from the root.

Frontend: http://localhost:5173  
API: http://localhost:5000

Default meal types are seeded when the server starts (if absent). Admin account details come from `ADMIN_NAME`, `ADMIN_PHONE`, and `ADMIN_PASSWORD` in `server/.env`.

## Important
- This is a usable MVP scaffold, not a certified accounting or payment system.
- Payments are recorded manually by admin; no real payment gateway is connected.
- Meal prices are snapshotted into meal records so historical bills don't change.
- Test carefully before using with real customer/payment data. Use HTTPS and strong secrets in production.
