# Job Helper Engine – Backend

A full-stack job-sharing platform backend built with **Node.js, Express, and SQLite**.

This platform allows users to:

* Register & Login
* Post job openings
* View their posted jobs
* Admin review & approve/reject jobs
* Public users view approved jobs

---

# Tech Stack

* Node.js
* Express.js
* SQLite3
* JWT Authentication
* bcrypt (Password Hashing)

---

# Project Structure

```
backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   └── databases/
│
├── app.js
├── package.json
└── README.md
```

---

# Database Schema

## Users Table

| Column        | Type          |
| ------------- | ------------- |
| id            | INTEGER (PK)  |
| name          | TEXT          |
| email         | TEXT (UNIQUE) |
| password_hash | TEXT          |
| role          | user / admin  |
| is_active     | INTEGER       |
| created_at    | DATETIME      |
| updated_at    | DATETIME      |

---

## Jobs Table

| Column       | Type                          |
| ------------ | ----------------------------- |
| id           | INTEGER (PK)                  |
| title        | TEXT                          |
| company_name | TEXT                          |
| description  | TEXT                          |
| apply_link   | TEXT (UNIQUE)                 |
| category     | TEXT                          |
| location     | TEXT                          |
| posted_by    | INTEGER (FK → users.id)       |
| status       | pending / approved / rejected |
| admin_note   | TEXT                          |
| expiry_date  | DATETIME                      |
| is_deleted   | INTEGER                       |
| created_at   | DATETIME                      |
| updated_at   | DATETIME                      |

---

# Authentication

JWT-based authentication.

Token includes:

```
{
  id,
  name,
  email,
  role
}
```

Protected routes require:

```
Authorization: Bearer <token>
```

---

# API Endpoints

---

## Auth Routes

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /auth/register |
| POST   | /auth/login    |
| GET    | /auth/me       |

---

## User Job Routes

| Method | Endpoint  |
| ------ | --------- |
| POST   | /jobs     |
| GET    | /jobs     |
| GET    | /jobs/:id |
| DELETE | /jobs/:id |

---

## Public Routes

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /public/jobs     |
| GET    | /public/jobs/:id |

Returns only:

* Approved jobs
* Not expired
* Not deleted

---

## Admin Routes

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /admin/jobs             |
| PATCH  | /admin/jobs/:id/approve |
| PATCH  | /admin/jobs/:id/reject  |
| DELETE | /admin/jobs/:id/delete  |

Admin-only access enforced via role middleware.

---

# Core Features

* Secure password hashing
* Role-based access control
* Soft delete mechanism
* Job moderation workflow
* Expiry date filtering
* Duplicate job prevention (UNIQUE apply_link)

---

# How to Run

### 1. Install dependencies

```
npm install
```

### 2. Create `.env` file

```
PORT=5000
JWT_SECRET_KEY=your_secret_key
```

### 3. Start server

```
node app.js
```

Server runs at:

```
http://localhost:5000
```

---

# Design Decisions

* **Single status column** instead of multiple job tables
* **Soft delete** using `is_deleted`
* **JWT auth** for stateless authentication
* **SQLite** for lightweight local DB
* **MVC architecture** for clean separation

---

# Future Improvements

* Pagination
* Rate limiting
* Input validation library (Joi/Zod)
* Logging middleware
* Docker support
* Deployment setup
* Unit testing

---

# Project Level

Backend aligns with:

* Strong Junior / 1–3 YOE Backend roles
* Demonstrates authentication, authorization, DB design, and structured architecture

---

# License

For learning and portfolio purposes.