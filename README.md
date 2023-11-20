# User Management API

This project is a simple Node.js and Express.js API for managing user details in MongoDB. It provides endpoints to add, retrieve, update, and delete user information.

## Getting Started

Before running the application, make sure you have Node.js and MongoDB installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/user-management-api.git


### API Endpoints
1. **Add User:**
Endpoint: POST /users
Description: Adds a new user to the database.
Request Body:

{
  "name": "John Doe",
  "role": "Admin",
  "email": "john@example.com",
  "phoneNumber": "123-456-7890"
}
