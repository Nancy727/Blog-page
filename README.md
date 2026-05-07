# Blog Platform

A full-stack blog application with a React/Vite frontend and an Express/MongoDB backend.

## Project Structure

- `client/` - React frontend built with Vite
- `server/backend/` - Express API, MongoDB models, and tests

## Features

- Browse a feed of blog posts
- View blog post details
- Create blog posts with file upload
- Like and delete posts
- User authentication screens in the frontend
- Protected profile endpoints on the backend

## Tech Stack

- Frontend: React, React Router, Axios, Vite
- Backend: Express, MongoDB, Mongoose, JWT, Multer
- Testing: Jest, Supertest, MongoDB Memory Server

## CI/CD

- Jenkins is used to automate the project through GitHub integration.
- Jenkins email notifications are configured to report build and pipeline status.

## Getting Started

### Prerequisites

- Node.js
- npm or pnpm
- MongoDB connection string

### 1. Install dependencies

Install the frontend and backend dependencies separately:

```bash
cd client
npm install

cd ../server/backend
pnpm install
```

### 2. Configure the backend

Create a `.env` file in `server/backend/` with the required values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 3. Start the backend

```bash
cd server/backend
pnpm dev
```

The API runs on the port defined in `PORT` and serves uploaded files from `/uploads`.

### 4. Start the frontend

```bash
cd client
npm run dev
```

The frontend is configured to talk to `http://localhost:5000/api`.

## Available Scripts

### Frontend

From `client/`:

- `npm run dev` - Start the Vite dev server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

### Backend

From `server/backend/`:

- `pnpm dev` - Start the API with nodemon
- `pnpm start` - Start the API with Node
- `pnpm test` - Run the Jest test suite

## API Routes

### Blog routes

- `GET /api/blogs` - List all blogs
- `GET /api/blogs/:id` - Get a single blog
- `POST /api/blogs` - Create a blog post with an uploaded file
- `PATCH /api/blogs/:id/like` - Toggle like for a blog
- `DELETE /api/blogs/:id` - Delete a blog
- `GET /api/blogs/:id/download` - Download the blog file

### User routes

Protected routes require a valid JWT in the `Authorization` header.

- `GET /api/users/me` - Get the current user profile
- `GET /api/users/me/blogs` - Get blogs created by the current user
- `GET /api/users/me/liked` - Get blogs liked by the current user

## Frontend Routes

- `/` - Home page
- `/blogs` - Blog list page
- `/blogs/:id` - Blog detail page
- `/create` - Create blog page
- `/login` - Login page
- `/register` - Register page

## Notes

- Blog creation expects a file upload named `file`.
- Uploaded files are stored under `server/backend/uploads/`.
- The frontend API helper currently targets `http://localhost:5000/api`.

## License

MIT