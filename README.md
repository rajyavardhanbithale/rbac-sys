# Role-Based Access Control (RBAC) System

## Overview
This project is an implementation of **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)**, designed to fulfill the requirements of the VRV Security Backend Developer Intern assignment. The system enables secure user registration, login, and access control based on roles such as Admin, User, and Moderator.

## Note
Because the frontend and backend are hosted on completely different domains, cookies may not work as expected due to cross-origin restrictions. To access the full functionality, either avoid refreshing the page after login or run the application locally with both frontend and backend on the same domain.

## Implementations
1. **Authentication**:
   - Secure user registration and login.
   - Passwords hashed using `bcrypt` for enhanced security.
   - Session management with **JWT**.

2. **Authorization**:
   - Role-based access to resources (e.g., Admin, User, Moderator).
   - Middleware for access control at the route level.

3. **RBAC**:
   - Flexible role and permission assignment.
   - Access control integrated into API endpoints.

4. **Security Best Practices**:
   - CORS enabled with restrictions.
   - HTTP headers hardened with `helmet`.

## Role Hierarchy

1. **ADMIN**: Full access to manage the system, users, roles, and content.
2. **MODERATOR**: Can moderate content (remove comments), but cannot manage users.
3. **USER**: Basic access to interact with content (create posts, comment).


## Roles & Permissions

| **Permission**                    | **USER** | **MODERATOR** | **ADMIN** |
|------------------------------------|----------|---------------|-----------|
| **Create Posts**                   | ✔        | ✔             | ✔         |
| **View Posts**                     | ✔        | ✔             | ✔         |
| **Comment on Posts**               | ✔        | ✔             | ✔         |
| **Delete Own Posts/Comments**      | ❌        | ✔             | ✔         |
| **Remove Comments**                | ❌        | ✔             | ✔         |
| **Delete Posts (Others' Posts)**   | ❌        | ✔             | ✔         |
| **View Admin Dashboard**           | ❌        | ❌            | ✔         |
| **Manage Users**                   | ❌        | ❌            | ✔         |
| **Change User Roles**              | ❌        | ❌            | ✔         |
| **Delete Users**                   | ❌        | ❌            | ✔         |

---

## RBAC Middleware
### `accessALL`
- **Description**: Grants access to users with any of the following roles: `ADMIN`, `MODERATOR`, or `USER`. 
- **Used In**: 
  - Routes that are open to all authenticated users, like viewing the dashboard, creating posts, etc.

### `accessAdminAndMods`
- **Description**: Grants access to users with either the `ADMIN` or `MODERATOR` role.
- **Used In**: 
  - Routes that require higher privileges, such as deleting comments.

### `accessAdmin`
- **Description**: Grants access only to users with the `ADMIN` role.
- **Used In**: 
  - Routes that are restricted to admins, such as deleting users, changing user roles, or deleting posts.

## Role-Based Access Control (RBAC) Flow
- **User Sends Request**: The user sends a request to a protected route with a JWT token in the Authorization header (Bearer token).
- **JWT Authentication**: The authenticate middleware verifies the JWT's validity and decodes the user’s details (id and role).
- **Role Verification**: The authorize middleware fetches the user's role from the database to check if it matches the role in the JWT.
- **Token Renegrate**: If the roles in the JWT and database don't match, or if the user's role has been updated in the database, a new JWT is generated with the correct role and set as a cookie.
- **Role Access Check**: The authorize middleware checks if the user’s role is authorized to access the requested route.
- **Access Granted/Denied**: If the user’s role is authorized, the request proceeds. If the role is not authorized, a 403 Forbidden response is sent.
  

### Postman Collection - [view](https://github.com/rajyavardhanbithale/rbac-sys/blob/main/RBAC.postman_collection.json)


## Routes

| Route                        | Route Name          | Description                                        | Access Level                    | Middleware Used                 |
|------------------------------|---------------------|----------------------------------------------------|----------------------------------|---------------------------------|
| `POST /api/auth/register`     | User Registration   | Registers a new user to the system.                | Public                          | None                            |
| `POST /api/auth/login`        | User Login          | Logs a user into the system and issues an access token. | Public                          | None                            |
| `POST /api/auth/refresh-token`| Token Refresh       | Issues a new access token using a valid refresh token. | Public                          | None                            |
| `POST /api/auth/logout`       | User Logout         | Logs the user out and invalidates their access token. | Authenticated Users             | `accessALL`                     |
| `GET /api/admin/users`        | Get Users           | Fetches a list of all users.                       | Admin Only                      | `accessAdmin`                   |
| `DELETE /api/admin/users/:id` | Delete User         | Deletes a user by their ID.                        | Admin Only                      | `accessAdmin`                   |
| `PATCH /api/admin/users/:id`  | Change User Role    | Updates the role of a user (e.g., user to admin).  | Admin Only                      | `accessAdmin`                   |
| `GET /api/dashboard`          | Dashboard Stats     | Returns statistics related to the application.     | Authenticated Users             | `accessALL`                     |
| `POST /api/posts`             | Create Post         | Creates a new post.                                | Authenticated Users             | `accessALL`                     |
| `GET /api/posts`              | Get All Posts       | Retrieves all posts.                               | Public                          | None                            |
| `GET /api/posts/:id`          | Get Post by ID      | Retrieves a single post by its ID.                 | Public                          | None                            |
| `DELETE /api/posts/:id`       | Delete Post         | Deletes a post by its ID.                          | Admin Only                      | `accessAdmin`                   |
| `POST /api/posts/comments`    | Add Comment         | Adds a comment to a post.                          | Authenticated Users             | `accessALL`                     |
| `GET /api/posts/comments/:id` | Get Comments for Post | Retrieves all comments for a specific post.        | Public                          | None                            |
| `DELETE /api/posts/comments/:id` | Delete Comment     | Deletes a comment by its ID.                       | Admin and Moderators            | `accessAdminAndMods`            |
| `GET /api/user/profile`       | Get User Profile    | Fetches the authenticated user's profile information. | Authenticated Users             | `accessALL`                     |

---


## Technologies Used
Node, Express, MongoDB, JWT, bcrypt, dotenv

## Setup Instructions

1. Clone the Project
```
    git clone https://github.com/rajyavardhanbithale/rbac-sys
```
2. Install dependecies 
```
    npm i 
```
3. Run the server
```
    npm run dev
```


## Project Structure
```
.
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── app.js
    ├── config
    │   └── db.js
    ├── controllers
    │   ├── adminController.js
    │   ├── authController.js
    │   ├── commentsController.js
    │   ├── dashboardController.js
    │   └── postsController.js
    ├── middleware
    │   ├── authMiddleware.js
    │   ├── authorizeMiddleware.js
    │   └── combinedMiddleware.js
    ├── models
    │   ├── commentsModel.js
    │   ├── postsModel.js
    │   ├── rolesModel.js
    │   └── userModel.js
    ├── routes
    │   ├── adminRoute.js
    │   ├── authRoute.js
    │   ├── dashboardRoute.js
    │   ├── postsRoute.js
    │   └── userRoute.js
    ├── server.js
    └── utils
        └── generateJWT.js
```
