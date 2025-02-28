Task Management API
A simple REST API for managing tasks, allowing users to create, fetch, update, and delete tasks.

    --> Table of Contents
    --> Features
    --> Technologies Used
    --> Setup Instructions
    --> API Endpoints
    --> Error Handling & Validation
    --> Project Structure
    --> API Documentation
    --> Evaluation Criteria

Technologies Used

    --> Node.js with Express.js
    --> MySQL (xammp)
    --> Postman for API documentation
    --> javasript for input validJoation

Setup Instructions

    --> git clone https://github.com/bello682/task-management-api-node.js.git
    --> cd task-management-api

Install Dependencies

    --> npm install

Set Up Environment Variables

    --> DB_HOST=localhost
    --> DB_USER=root
    --> DB_PASSWORD=password
    --> DB_NAME=tasks_db
    --> PORT=7072

**API Endpoints:**

- **POST** `/create-user-task` → Create a new task
- **GET** `/fetch-user-task` → Fetch all tasks
- **POST** `/update-user-task/:id` → Update a task by ID
- **POST** `/delete-user-task/:id` → Delete a task by ID
