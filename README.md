# Property Management System

## Overview
This project is a property management system developed using Node.js with express.js for the backend and React for the frontend. It includes features for user authentication and role management, property card management, and lead management.

## Features
### Backend (Nodejs)
- **User Roles**: Admin and Customer (Leads)
- **Authentication**: Admin login using username and password with JWT authentication
- **Property Management**: CRUD operations for property cards
- **Lead Management**: Create leads and link them to property cards

### Frontend (React.js)
- **Authentication UI**: Admin login form with validation
- **Property and Lead Views**: Display and manage property cards and leads
- **State Management**: Used Redux for state management

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
   https://github.com/Athulraj10/propertyManagement.git

2. **Install dependencies for backend and frontend:**
    cd backend
    npm install

    cd frontend
    npm install

3. **Setup environment variables:**
    .env will attached with backend .env   

4. **Run the application:**

    **Backend:**
    cd backend
    npm run dev

    **Frontend:**
    cd frontend
    npm run dev

## Project Structure
### Backend
- **Controllers**: Handle incoming requests and return responses.
- **Models**: Define the data structure using Mongoose schemas.
- **Middlewares**: Handle request pre-processing, such as authentication.

### Frontend
- **Components**: Reusable UI components.
- **Pages**: Represent different routes.
- **Services**: Handle API calls.
- **Redux**: Manage global state using Context API.

## Usage

### Authentication
1. **Admin Registration**: Endpoint to register admin users.
2. **Admin Login**: Endpoint to authenticate admin users and obtain a JWT token.

### Property Management
1. **Create Property Card**: Endpoint to create a new property card.
2. **Update Property Card**: Endpoint to update an existing property card.
3. **Retrieve Property Cards**: Endpoint to get a list of property cards.
4. **Delete Property Card**: Endpoint to delete a property card.

### Lead Management
1. **Create Lead**: Endpoint to create a new lead.
2. **Link Lead to Property Card**: Endpoint to link a lead to a property card.

## Testing
Testing has not been implemented yet. To add tests, create unit tests for your controllers, services, and components.

## Security
- Passwords are hashed using bcrypt before storing them in the database.
- Routes are protected using JWT authentication middleware.

## Code Quality
- The code follows the MVC (Model-View-Controller) pattern.
