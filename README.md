User Management System

This is a React-based user management system that allows users to:

View a paginated list of users
Edit user details
Delete users
The application interacts with the Reqres API for user data.

🚀 Features
Fetch users from API
Edit user details and reflect changes immediately
Delete users

Pagination for navigating between user lists
UI designed using Tailwind CSS

📂 Project Structure
📁 src
 ├── 📁 api
 │   ├── api.js             # API functions for fetching, updating, and deleting users
 ├── 📁 components
 │   ├── Users.js           # Displays users with pagination & actions (edit/delete)
 │   ├── EditUsers.js       # Edit user form
 ├── 📁 pages
 │   ├── Home.js            # Main landing page (if needed)
 ├── 📁 routes
 │   ├── AppRoutes.js       # Defines routes for navigation
 ├── App.js                 # Main React component
 ├── index.js               # Entry point

🔗 API Functions (api.js)

1. Fetch Users
export const fetchUsers = async (page = 1) => {
    try {
        const response = await fetch(`https://reqres.in/api/users?page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return { data: [] };
    }
};

Fetches a paginated list of users from Reqres API.

2. Fetch a User by ID
export const fetchUserById = async (id) => {
    try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

Fetches details of a specific user using their id.

3. Update a User
export const updateUser = async (id, userData) => {
    try {
        const response = await fetch(`https://reqres.in/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

Updates user details and returns the updated user data.

4. Delete a User
export const deleteUser = async (id) => {
    try {
        await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

Deletes a user from the API.

🎨 Components

1. Users.js (User Listing Page)

Fetches and displays users in a paginated format.
Allows deleting users.
Navigates to the edit page when editing.

2. EditUsers.js (User Editing Page)
Fetches a single user by id.
Allows editing user details and updates them in the UI.
Navigates back to the users list after update.

🔧 Installation & Setup

Clone the repository:
git clone https://github.com/hustlers9720/user-management.git
cd user-management

Install dependencies:
npm install

Start the development server:
npm start

Open http://localhost:3000 in your browser.

📌 Notes

Updates are temporary because Reqres is a mock API.
After refreshing, edits will be lost.

This project demonstrates React Router, API integration, and state management.

React.js - Frontend framework
Tailwind CSS - UI styling
React Router - Navigation

Reqres API - Mock API for user data
🚀 Happy Coding!

