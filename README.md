<div align="center">

# 🚀 Blog API

### RESTful Blog API built with NestJS, MongoDB & JWT Authentication

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A complete RESTful Blog API built with **NestJS**, **MongoDB**, **Mongoose**, and **TypeScript**.

Developed as part of the **ITI Backend Development Track**.

</div>

---

# 📑 Table of Contents

- Overview
- Features
- Technologies
- Project Structure
- Database Design
- Authentication
- API Endpoints
- Installation
- Environment Variables
- Running the Project
- Future Improvements
- Author

---

# 📖 Overview

This project demonstrates how to build a scalable REST API using NestJS following a modular architecture.

It includes:

- Authentication
- Authorization
- CRUD Operations
- MongoDB Relationships
- DTO Validation
- Pagination
- Searching
- Sorting
- File Upload
- Password Hashing

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt

---

## 🛡 Authorization

- JWT Guard
- Roles Guard
- Role-based Authorization

---

## 👤 User Management

- Create User
- Get All Users
- Get User By ID
- Update User
- Delete User
- Upload User Image

---

## 📝 Post Management

- Create Post
- Get All Posts
- Get Post By ID
- Update Post
- Delete Post
- Get Posts By User

### Query Features

- Pagination
- Search by Title
- Sort by Date

---

## 👥 Groups

- Create Group
- Get Groups
- Update Group
- Delete Group

---

## ✅ Validation

- DTO Validation
- Email Validation
- Required Fields Validation
- Global Validation Pipe

---

## 🔄 Cascade Delete

Deleting a user automatically removes all posts created by that user.

---

# 🛠 Tech Stack

| Technology        | Purpose                 |
| ----------------- | ----------------------- |
| NestJS            | Backend Framework       |
| TypeScript        | Programming Language    |
| MongoDB           | Database                |
| Mongoose          | ODM                     |
| JWT               | Authentication          |
| Passport          | Authentication Strategy |
| bcrypt            | Password Hashing        |
| Multer            | File Upload             |
| class-validator   | Validation              |
| class-transformer | DTO Transformation      |

---

# 📂 Project Structure

```text
src
│
├── auth
│   ├── decorators
│   ├── dto
│   ├── enums
│   ├── guards
│   ├── strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
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
├── groups
│   ├── dto
│   ├── schemas
│   ├── groups.controller.ts
│   ├── groups.service.ts
│   └── groups.module.ts
│
├── app.module.ts
└── main.ts
```

---

# 🗄 Database Design

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
  group: ObjectId;
}
```

---

## Group

```ts
{
  name: string;
  description: string;
  admins: ObjectId[];
  members: ObjectId[];
  permissions: string;
}
```

---

# 🔐 Authentication

## Register

```http
POST /auth/register
```

---

## Login

```http
POST /auth/login
```

Returns a JWT Token.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /auth/register |
| POST   | /auth/login    |

---

## Users

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /users        |
| GET    | /users        |
| GET    | /users/:id    |
| PATCH  | /users/:id    |
| DELETE | /users/:id    |
| POST   | /users/upload |

---

## Posts

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /posts              |
| GET    | /posts              |
| GET    | /posts/:id          |
| GET    | /posts/user/:userId |
| PATCH  | /posts/:id          |
| DELETE | /posts/:id          |

---

## Groups

| Method | Endpoint    |
| ------ | ----------- |
| POST   | /groups     |
| GET    | /groups     |
| GET    | /groups/:id |
| PATCH  | /groups/:id |
| DELETE | /groups/:id |

---

# 🔍 Query Parameters

### Pagination

```http
GET /posts?page=1&limit=10
```

### Search

```http
GET /posts?search=nestjs
```

### Sort

```http
GET /posts?sort=asc
```

or

```http
GET /posts?sort=desc
```

Example

```http
GET /posts?page=1&limit=5&search=node&sort=desc
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/YYousabFouad/blog-api.git
```

Go to project

```bash
cd blog-api
```

Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file.

```env
PORT=3000

MONGO_URI=mongodb://localhost:27017/blog-api

JWT_SECRET=ITI_SECRET_KEY

IMAGEKIT_PUBLIC_KEY=

IMAGEKIT_PRIVATE_KEY=

IMAGEKIT_URL_ENDPOINT=
```

---

# ▶ Running the Project

Development

```bash
npm run start:dev
```

Production

```bash
npm run start
```

---

# 🚀 Future Improvements

- Swagger Documentation
- Docker Support
- Unit Testing
- Refresh Token Authentication
- Email Verification
- Password Reset
- ImageKit Full Integration
- CI/CD Pipeline

---

# 👨‍💻 Author

## Yosab Fouad

Backend Developer

GitHub

https://github.com/YYousabFouad

---

<div align="center">

⭐ If you like this project, consider giving it a star.

</div>
