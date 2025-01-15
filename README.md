## Overview

This project is a simple blog platform where users can create, read, update, and delete blog posts. The project is split into two parts:

- **Frontend**: A user interface built with React to interact with the backend.
- **Backend**: A server built with Node.js and Express to manage blog posts and interact with a database.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Requirements

Before you start, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/) as an alternative)

## Features

- User authentication and authorization
- Create, read, update, and delete (CRUD) blog posts
- Responsive design
- Search functionality by title
- Pagination for posts

## Technologies

- **Frontend:**

  - React.js
  - Tailwind CSS
  - React TanStack Query
  - Axios

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT for authentication

- **Docker**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jianzhu0119/ses-ai-test.git
   cd blog-express
   ```

2. Install dependencies for both client and server:

   ```bash
   # Install server dependencies
   cd ./backend
   npm install

   # Install client dependencies
   cd ./frontend
   npm install
   ```

3. Create a `.env` file in the `frontend` and `backend` directory and add the following environment variables:

   ```env (backend)
   MONGO_URI=<your-mongodb-uri>
   MIGRATE_MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

   ```env (frontend)
   VITE_API_URL=<backend-url>
   ```

## Usage

1. Initilize Database:

   ```bash
   cd ./backend
   npx migrate up
   ```

2. Start the application:

   ```bash
   docker-compose up --build
   ```

   OR

   ```bash
   cd ./backend
   npm run dev
   ```

   ```bash
   cd ./frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3001`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
