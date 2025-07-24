# Controllers Overview

This README documents the exported functions found in **UserController** (`controllers/userController.js`) and **CategoryController** (`controllers/categoryController.js`).  
Each entry notes the function’s purpose, inputs, and typical output (status codes / data).

---

## 🧑‍💼 UserController

| Function | Purpose | Receives | Returns |
|----------|---------|----------|---------|
| **register(req, res)** | Register a new user in the database. | `req.body` → `{ rol, name, mobile, email, password, location }` | **201** `{ message: "User registered successfully" }` on success. <br> **400 / 500** with an error message on validation failure, duplicate email, or server error. |
| **login(req, res)** | Authenticate a user and issue a JWT. | `req.body` → `{ email, password }` | **200** `{ token }` on success (1 h expiry). <br> **400 / 500** with an error message on invalid credentials or server error. |
| **updateProfile(req, res)** | Update the authenticated user’s profile details. | `req.body` → `{ name, previousJobs }`  <br>`req.user.id` (set by auth middleware) | **200** `{ message, user }` with updated user object. <br> **404 / 500** on missing user or server error. |
| **getUserProfile(req, res)** | Fetch a user’s public profile (self-view). | `req.user.id` from JWT | **200** User fields: `id, name, mobile, email, previousJobs`. <br> **404 / 500** on not found or server error. |

---

## 🗂️ CategoryController

| Function | Purpose | Receives | Returns |
|----------|---------|----------|---------|
| **addCategory(req, res)** | Create a new category with a slug. | `req.body` → `{ name, description }` (validated by Joi) | **201** `newCategory` JSON including `id, category_name, description, slug`. <br> **400 / 500** on validation, duplication, or server error. |
| **getAllCategories(req, res)** | Retrieve every category in the table. | *(none beyond `req` / `res`)* | **200** `[ ...categories ]` array. <br> **500** on server error. |
| **deleteCategory(req, res)** | Remove a category by its primary key. | `req.params.id` (URL param) | **200** `{ message: "Category deleted successfully" }` on success. <br> **404 / 500** on not found or server error. |

---

### Common Notes

* All controllers use **Sequelize models** and return JSON.  
* Passwords are hashed with **bcrypt**.  
* Authentication relies on **JWT** – ensure `process.env.JWT_SECRET` is set.  
* Validation of category input is handled by **Joi**; user input validation is manual.  
* HTTP status codes follow REST conventions (`2xx` success, `4xx` client error, `5xx` server error).

---

