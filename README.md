
# Frontend: Meal Planner Application

## Overview

This is the frontend application for a meal and shopping list management system. It allows users to manage weekly meal plans, select and assign plates for each meal (breakfast, lunch, dinner) by day, and interact with a shopping list of products. The app uses React for the user interface, with hooks to manage API requests for adding, updating, and deleting meals and products.

## Features 📋

User Management:
- Meal Plan Management: View, add, and edit meals for each day of the week. Meals include breakfast, lunch, and dinner.
- Product Shopping List: Add, edit, delete individual products, and delete the entire list in a shopping list.
- Meal Assignment: Assign existing plates to meals for specific days.
- Dynamic Meal View: View available meals for each day, with the ability to add, edit, or delete them. 
- API Integration: Uses custom hooks (useApi) to interact with the backend API for meal and product management.
- User Feedback: Displays loading states, error handling, and success messages.

## Technologies Used 🛠️

- React: For building the UI.
- React Router: For client-side routing and navigation.
- SASS: For modular and scalable styles.
- Fetch API: For making asynchronous requests to the backend.
- Date-fns: For handling and formatting dates.

## Installation Guide 🔧

**Prerequisites**

- Node.js
- npm or yarn

**Setup**

1. Clone the repository
   
2. Navigate to the project directory

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
`````
npm run dev
`````

## Usage

**Meal Management**

- Add a Meal: Navigate to the "Add a meal" section, select a day, and assign a plate to a meal (breakfast, lunch, or dinner).
- Edit a Meal: Edit an assigned plate by clicking the "Edit" button next to it.
- Delete a Meal: Remove a meal by clicking the "Delete" button.

**Product Shopping List**

- Add a Product: Type a product name into the input field and click the "+" button to add it to the shopping list.
- Edit a Product: Edit the name of a product by clicking "Edit," typing the new name, and saving the changes.
- Delete a Product: Remove a product by clicking "Delete" next to it.
- Delete All Products: Click "Delete All" to clear the entire shopping list.

## Folder Structure

- src/components: Reusable components like buttons, forms, and meal cards.
- src/pages: Different screens such as home and meal add/edit pages.
- src/services: Custom hooks like useApi for handling API requests.
- src/styles: SASS files for global and component-specific styling.

## Contribution

Contributions are welcome. Please follow these steps:

1. Fork the project
2. Create a new branch:
   ```bash
   git checkout -b feature/new-functionality
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add new functionality'
   ```
4. Push your changes to the branch:
   ```bash
   git push origin feature/new-functionality
   ```
5. Open a Pull Request

## Backend Integration

For the backend setup and more details about the API endpoints, refer to the Backend [README](https://github.com/Euge-Saravia/MyMenu-backend).

## Author ✒️

- [**Eugenia**](https://github.com/Euge-Saravia)