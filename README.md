<div align="center">

# 🚀 Blog API

### RESTful Blog API built with NestJS & MongoDB

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

A RESTful API for managing users and blog posts using **NestJS**, **MongoDB**, and **TypeScript**.

Developed as part of an **ITI Backend Development Task** with additional bonus features implemented beyond the core requirements.

</div>

---

# 📑 Table of Contents

- Overview
- Features
- Technologies
- Project Structure
- Database Design
- API Endpoints
- Bonus Features
- Installation
- Environment Variables
- Running the Project
- Future Improvements
- Author

---

# 📖 Overview

This project provides a complete Blog REST API where users can create blog posts and manage their data.

The project demonstrates:

- REST API Design
- NestJS Modules
- MongoDB Relationships
- Validation
- Password Hashing
- CRUD Operations
- Pagination
- Searching
- Sorting
- File Upload

---

# ✨ Features

## 👤 User Management

- Create User
- Get All Users
- Get User By ID
- Update User
- Delete User

### Validation

- Email Validation
- Required Fields Validation
- DTO Validation
- Global Validation Pipe

### Security

- Password Hashing using bcrypt
- Duplicate Email Detection

---

## 📝 Post Management

- Create Post
- Get All Posts
- Get Post By ID
- Update Post
- Delete Post

### Relationships

- One User ➜ Many Posts
- MongoDB ObjectId Reference
- Populate Author Information

---

## 🔄 Cascade Delete

Deleting a user automatically deletes all posts created by that user.

---

# ⭐ Bonus Features

- Pagination
- Search by Title
- Sorting
- Image Upload using Multer

---

# 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| NestJS | Backend Framework |
| TypeScript | Programming Language |
| MongoDB | Database |
| Mongoose | ODM |
| bcrypt | Password Hashing |
| class-validator | Validation |
| class-transformer | DTO Transformation |
| Multer | File Upload |

---

# 📂 Project Structure

```text
src
│
├── users
│   ├── dto
│   ├── schemas
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
│
├── posts
│   ├── dto
│   ├── schemas
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
│
├── app.module.ts
└── main.ts
```

---

# 🗄️ Database Design

## User

```ts
{
  name: string;
  email: string;
  password: string;
  age: number;
  image: string;
}
```

---

## Post

```ts
{
  title: string;
  content: string;
  image: string;
  author: ObjectId;
}
```

---

# 📡 API Endpoints

## Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/users` | Create User |
| GET | `/users` | Get All Users |
| GET | `/users/:id` | Get User |
| PATCH | `/users/:id` | Update User |
| DELETE | `/users/:id` | Delete User |

---

## Posts

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/posts` | Create Post |
| GET | `/posts` | Get All Posts |
| GET | `/posts/:id` | Get Post |
| PATCH | `/posts/:id` | Update Post |
| DELETE | `/posts/:id` | Delete Post |

---

# ⭐ Query Parameters

## Pagination

```http
GET /posts?page=1&limit=10
```

---

## Search

```http
GET /posts?search=nestjs
```

---

## Sort

Ascending

```http
GET /posts?sort=asc
```

Descending

```http
GET /posts?sort=desc
```

Combined Example

```http
GET /posts?page=2&limit=5&search=nestjs&sort=desc
```

---

# ⚙️ Installation

Clone Repository

```bash
git clone https://github.com/YYousabFouad/blog-api.git
```

Go to Project

```bash
cd blog-api
```

Install Packages

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file.

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/blog-api
```

---

# ▶️ Running the Project

Development

```bash
npm run start:dev
```

Production

```bash
npm run start
```

---

# 📌 Future Improvements

- JWT Authentication
- Login & Register
- Role-Based Authorization
- Swagger API Documentation
- Docker Support
- Unit Testing
- Global Exception Filters
- Logging
- Repository Pattern
- Refresh Tokens

---

# 🎓 Academic Context

This project was originally developed as part of an **ITI (Information Technology Institute) Backend Development Task**.

In addition to the required specifications, several optional enhancements (bonus features) were implemented to improve functionality and demonstrate practical backend development skills.

---

# 👨‍💻 Author

**Yosab Fouad**

Backend Developer

GitHub:
**https://github.com/YYousabFouad**

