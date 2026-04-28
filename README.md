#  Laundry Order Management System (Mini CRM)

A lightweight backend system to manage laundry/dry-cleaning orders.
Built using **Next.js (App Router), MongoDB, and REST APIs**, with strong focus on speed, simplicity, and AI-assisted development.

This project demonstrates practical backend design, efficient data handling using MongoDB aggregation, and effective use of AI tools in real-world development.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd laundry-crm
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the project

```bash
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

## Features Implemented

### Order Management

* Create new laundry orders
* Auto-calculates total bill
* Generates unique `orderId`

### Order Status Tracking

* Status flow:

  * RECEIVED → PROCESSING → READY → DELIVERED
* Update order status via API

### View Orders

* Fetch all orders
* Filter by:

  * Status
  * Customer name (partial search)
  * Phone number

### Dashboard API

* Total orders
* Total revenue
* Orders grouped by status
* Uses MongoDB aggregation for efficient computation

---

## Tech Stack

* **Frontend/Backend Framework:** Next.js (App Router)
* **Language:** JavaScript
* **Database:** MongoDB (Mongoose)
* **API Style:** REST

---

## API Endpoints

All APIs follow RESTful principles using resource-based routing and standard HTTP methods.

### Create Order

```
POST /api/orders
```

### Get Orders

```
GET /api/orders
```

### Update Order Status

```
PATCH /api/orders/:id/status
```

### Dashboard

```
GET /api/dashboard
```

---

##  API Testing

Postman collection is available in `/postman` folder.  
Import it to test all endpoints quickly.

---

## AI Usage Report

### 🔹 Tools Used

* ChatGPT (primary)
* Perplexity AI (optional suggestions)

---

### 🔹 Where AI Helped

* Initial project scaffolding (Next.js + API routes)
* Generating boilerplate for CRUD APIs
* Writing MongoDB aggregation queries
* Structuring folder architecture
* Drafting validation logic

---

### 🔹 Sample Prompts Used

* “Create a Next.js API route for managing orders with MongoDB”
* “Write a function to calculate total bill from items array”
* “How to implement filtering in MongoDB using query params”
* “MongoDB aggregation for total revenue and grouped counts”

---

### 🔹 Where AI Was Incorrect / Needed Improvement

* Incorrect handling of Next.js async route params (`params` needed `await`)
* Wrong `Response.json()` usage (misplaced message object)
* Weak validation logic (missing edge cases)
* No handling of real-world scenarios like duplicate submissions
* AI initially did not implement filtering logic for status, phone number, and customer name, which was later added manually. 

---

### 🔹 Improvements Made Manually

* Fixed async `params` handling in App Router
* Corrected API response structure
* Added proper validation for inputs
* Designed clean folder structure for scalability
* Used custom `orderId` instead of exposing Mongo `_id`
* Implemented MongoDB aggregation for dashboard performance
* Integrated filtering functionality into the frontend UI for better usability

---

## Tradeoffs

### What was skipped

* Authentication system
* Advanced validation (deep schema checks)


### Why

Focus was kept on:

* Delivering a fully working end-to-end system within time constraints
* Prioritizing core backend functionality over advanced features
* Keeping the architecture simple and maintainable
* Ensuring fast development using AI-assisted workflows
---

## Future Improvements


* Add authentication (JWT / session-based)
* Add estimated delivery date
* Prevent duplicate order submissions
* Search option for type of garments 

---

## Key Learnings

* Practical usage of MongoDB aggregation
* Handling async behavior in Next.js App Router
* Structuring scalable backend systems quickly
* Effectively using AI while validating and improving outputs
* Making good looking UI for better flow understanding  

---

##  Demo

You can test the application using:

* Postman (collection available in `/postman`)
* Thunder Client
* Browser (for GET endpoints)

###  Live Website

🔗 https://laundry-ms-black.vercel.app/

###  Demo Video

🔗 https://drive.google.com/file/d/1aamc_Y2VozZOnT4a64zmbFOmDlIjY0bH/view?usp=sharing

--------------

##  Author

Aditya Joshi
