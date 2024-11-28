# Role-Based Access Control (RBAC) System

## Overview
This project is an implementation of **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)**, designed to fulfill the requirements of the VRV Security Backend Developer Intern assignment. The system enables secure user registration, login, and access control based on roles such as Admin, User, and Moderator.

## Features
1. **Authentication**:
   - Secure user registration and login.
   - Passwords hashed using `bcrypt` for enhanced security.
   - Session management with **JWT**.

2. **Authorization**:
   - Role-based access to resources (e.g., Admin, User, Moderator).
   - Middleware to enforce access control at the route level.

3. **RBAC**:
   - Flexible role and permission assignment.
   - Access control integrated into API endpoints.

4. **Security Best Practices**:
   - CORS enabled with restrictions.
   - HTTP headers hardened with `helmet`.
   - Logging and debugging with `morgan`.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: Database for user and role storage.
- **JWT**: Token-based authentication.
- **bcrypt**: Password hashing.
- **dotenv**: Environment variable management.

## Project Structure
