# VITConnect - Academic Event Management Portal

VITConnect is a comprehensive event management platform designed for universities. It facilitates event discovery and registration for students while providing robust management tools for administrators.

## Features

### Role-Based Access
- **Students**:
    - Browse and search for campus events.
    - View detailed event information.
    - Register for events.
    - **My Dashboard**: View personal event registrations.
- **Admins**:
    - Secure login (pre-created credentials).
    - **Dashboard**: Overview of all events.
    - **Event Management**: Create, Edit, and Delete events.
    - **Registrations**: View list of registered students for each event.
    - Mark events as "Featured" to appear on the homepage carousel.

### Technical Highlights
- **Frontend**: Vanilla HTML/CSS/JS (SPA-like feel).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Local or Atlas).
- **Authentication**: Session-based auth with `express-session` and `connect-mongo`.
- **Security**: Password hashing (`bcrypt`), Route protection middleware.
- **Styling**: Modern Dark Theme custom CSS (Flexbox/Grid), No frameworks.

## Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB installed and running locally on default port (27017).

### Installation
1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Seed Database** (Optional but recommended):
    This command clears the database and creates default Admin and Student users, plus sample events.
    ```bash
    node backend/seeder.js
    ```

3.  **Run Application**:
    ```bash
    npm start
    ```
    The server will start on `http://localhost:5000`.

### Default Credentials
After running the seeder, use these credentials to log in:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@vit.edu` | `adminpassword` |
| **Student** | `john@vit.edu` | `password123` |

## Project Structure
- `server.js`: Main entry point.
- `backend/`: API logic (models, controllers, routes).
- `public/`: Static frontend files (HTML, CSS, JS).

## Academic Evaluation Notes
- The project focuses on clean architecture and fundamental web concepts without relying on heavy frontend frameworks like React.
- Authentication is secure and stateful using sessions.
- Data consistency is maintained via Mongoose models.
