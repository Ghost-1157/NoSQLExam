# Music Store API

## Overview
This is a backend application built using **Express.js, Node.js, and MongoDB** to manage musical instruments, recordings, and venues. The API supports CRUD operations, authentication, pagination, indexing, and data retrieval.

## Features
- **CRUD Operations** for Instruments, Recordings, and Places
- **JWT Authentication** for secure access to protected routes
- **Pagination** to efficiently query large datasets
- **Indexing** for optimized query performance
- **Data Import** from external sources
- **Relationships between collections** using Mongoose `populate()`

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JWT (JSON Web Token) for authentication
- Bcrypt for password hashing
- Axios (for external data fetching)
- Cors (for cross-origin requests)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (or use MongoDB Atlas for cloud storage)

### Steps
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start MongoDB (if running locally):
   ```sh
   mongod --dbpath C:/data/db
   ```
3. Run the application:
   ```sh
   npm start
   ```
   The API will run on `http://localhost:3000`

## Authentication
### Register a User
```sh
curl -X POST "http://localhost:3000/register" -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
```

### Login to Get a Token
```sh
curl -X POST "http://localhost:3000/login" -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
```
Response:
```json
{
  "token": "your_jwt_token_here"
}
```

Use this token in the `Authorization` header for protected routes.

## API Endpoints
### Instruments
- **GET** `/instruments?page=1&limit=10` (Requires Authentication)
- **POST** `/instruments` (Requires Authentication)
- **PUT** `/instruments/:id` (Requires Authentication)
- **DELETE** `/instruments/:id` (Requires Authentication)

### Recordings
- **GET** `/recordings?page=1&limit=10` (Requires Authentication)
- **POST** `/recordings` (Requires Authentication)
- **PUT** `/recordings/:id` (Requires Authentication)
- **DELETE** `/recordings/:id` (Requires Authentication)

### Places
- **GET** `/places?page=1&limit=10` (Requires Authentication)
- **POST** `/places` (Requires Authentication)
- **PUT** `/places/:id` (Requires Authentication)
- **DELETE** `/places/:id` (Requires Authentication)

### Data Import
- **GET** `/import-data` (Requires Authentication) - Import data from an external source

## Relationships in Collections
- Instruments have **related recordings** (`relatedRecordings` field references `Recording` collection)
- Recordings reference **instrument used** (`instrumentUsed` field) and **place recorded** (`placeRecorded` field)
- Places store **recordings held** (`recordingsHeld` field references `Recording` collection)

## Deployment
To deploy on a cloud service like **Render, Railway, or Vercel**:
1. Configure environment variables for **MongoDB Atlas**
2. Deploy using GitHub integration or a CI/CD pipeline

## License
MIT License

---
**Maintained by Mark Suprunov** 
