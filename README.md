# 📚 BookNest Server

The BookNest Server is a RESTful backend API built with **Node.js**, **Express.js**, and **MongoDB**. It powers the BookNest platform by handling authentication, book management, borrow requests, dashboard statistics, and admin operations. Secure authentication is implemented using **Better Auth** with JWT verification.

---

## 🌐 Links

- 🚀 **Live Demo:** https://your-live-demo-link.com
- 💻 **Client Repository:** https://github.com/moajjem441/BookNest
- ⚙️ **Server Repository:** https://github.com/moajjem441/BookNest-server

---

# ✨ Features

* 🔐 JWT Authentication using Better Auth
* 📚 CRUD operations for books
* 📥 Borrow request management
* 👤 User dashboard statistics
* 🛡️ Admin approval & rejection system
* 🔄 Automatic book status synchronization
* 📦 MongoDB database integration
* ⚡ RESTful API architecture
* 🌍 CORS enabled
* 🔒 Protected API routes

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Better Auth
* JOSE (JWT Verification)
* Dotenv
* CORS

---

# 📂 Project Structure

```text
server/
├── index.js
├── middleware/
├── routes/
├── package.json
├── .env
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

CLIENT_URL=http://localhost:3000
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/booknest-server.git

cd booknest-server
```

## Install Dependencies

```bash
npm install
```

---

# ▶️ Run Development Server

```bash
npm run dev
```

or

```bash
nodemon index.js
```

Server runs at

```text
http://localhost:5000
```

---

# 🗄️ Database Collections

```text
books
user
borrowRequest
```

---

# 🔐 Authentication

Protected routes require an Authorization header.

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

JWT tokens are verified using Better Auth before allowing access to protected endpoints.

---

# 📡 API Endpoints

## Books

| Method | Endpoint     | Description      | Auth |
| ------ | ------------ | ---------------- | ---- |
| GET    | `/books`     | Get all books    | ❌    |
| GET    | `/books/:id` | Get single book  | ❌    |
| POST   | `/books`     | Share a new book | ✅    |
| DELETE | `/books/:id` | Delete a book    | ✅    |

---

## Borrow Requests

| Method | Endpoint               | Description              | Auth    |
| ------ | ---------------------- | ------------------------ | ------- |
| POST   | `/books/:id/request`   | Request to borrow a book | ✅       |
| GET    | `/borrow-requests`     | Get all borrow requests  | ❌       |
| PATCH  | `/borrow-requests/:id` | Approve / Reject request | ✅ Admin |
| DELETE | `/borrow-requests/:id` | Delete borrow request    | ✅ Admin |

---

## Dashboard

| Method | Endpoint                           | Description                 | Auth |
| ------ | ---------------------------------- | --------------------------- | ---- |
| GET    | `/dashboard/books`                 | Shared books statistics     | ✅    |
| GET    | `/dashboard/shared-books/:userId`  | User shared books           | ✅    |
| GET    | `/dashboard/borrowRequests/email`  | Dashboard borrow statistics | ✅    |
| GET    | `/dashboard/borrowRequests/:email` | Pending borrow requests     | ✅    |
| DELETE | `/dashboard/borrowRequests/:id`    | Delete pending request      | ✅    |
| GET    | `/dashboard/books/borrowed/:email` | Approved borrowed books     | ✅    |
| PATCH  | `/dashboard/books/return/:id`      | Return borrowed book        | ✅    |

---

## Users

| Method | Endpoint     | Description          | Auth |
| ------ | ------------ | -------------------- | ---- |
| GET    | `/users/:id` | Get user information | ❌    |

---

# 🔄 Borrow Request Workflow

```text
User
   │
   ▼
Request Book
   │
   ▼
Borrow Request Created
   │
   ▼
Admin Reviews Request
   │
 ┌───────┴────────┐
 │                │
 ▼                ▼
Approved      Rejected
 │
 ▼
Book Status → Borrowed
 │
 ▼
User Can Access Book
```

---

# 🏗️ Architecture

```text
Client
   │
   ▼
Express.js API
   │
   ▼
Authentication (Better Auth)
   │
   ▼
MongoDB Database
```

---

# 📌 Main Functionalities

### 📚 Book Management

* Create Book
* Get All Books
* Get Single Book
* Delete Book

### 📥 Borrow Request

* Send Borrow Request
* Prevent Duplicate Requests
* Prevent Borrowing Own Book
* Track Request Status

### 👤 Dashboard

* Shared Books Count
* Pending Requests Count
* Borrowed Books Count
* User Book List

### 🛡️ Admin

* Approve Request
* Reject Request
* Delete Requests
* Automatic Book Status Update

---

# 🚀 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

# 🔮 Future Improvements

* Role-based middleware
* API documentation with Swagger
* Email notifications
* Rate limiting
* Book return history
* Advanced filtering
* Pagination
* Search API
* Logging system

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Moajjem Hossain**

- GitHub: https://github.com/moajjem441
- LinkedIn: https://www.linkedin.com/in/moajjem-hossain-/

---

⭐ If you found this project useful, don't forget to give the repository a **Star**!
