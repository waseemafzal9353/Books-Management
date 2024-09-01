# Book Management Application

## Overview
This is a CRUD (Create, Read, Update, Delete) application for managing a list of books. The application allows users to add, edit, delete, and search for books based on their title or author. It is built using React and follows best practices for code quality, state management, and responsive design.

## Features
- **Book List View**: Displays a list of books with details like Title, Author, Genre, and Year of Publication. Users can filter the list using the search bar.
- **Add Book**: Provides a form to add a new book. The form includes validation to ensure all fields are filled and the year is a valid number.
- **Edit Book**: Allows users to edit an existing book's details. The form is pre-filled with the current book information.
- **Delete Book**: Enables users to delete a book after confirming the action.
- **Search Functionality**: Allows users to search for books by title or author.

## Tech Stack
- **Frontend**: React.js, React Hooks
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Mock API**: JSON Server

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/waseemafzal9353/books-management.git
    ```
2. Navigate to the project directory:
    ```bash
    cd books-management
    ```
3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

4. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

5. Start the JSON server:
    ```bash
    npm run json-server
    ```

## Available Scripts

- `npm start`: Starts the development server.
- `npm run json-server`: Starts the JSON Server.

## API Endpoints (Mocked with JSON Server)
- `GET /books` - Fetch the list of books.
- `POST /books` - Add a new book.
- `PUT /books/:id` - Update an existing book.
- `DELETE /books/:id` - Delete a book.

## Design Decisions
- **React Functional Components**: The application is built with functional components and React Hooks to manage state and lifecycle methods.
- **State Management**: Redux Tool Kit is used to manage the global state, ensuring consistent state management across the application.
- **Routing**: React Router is used to handle navigation between the different views (Book List, Add Book, Edit Book).
- **Styling**: Tailwind CSS is chosen for styling due to its utility-first approach, allowing for rapid and consistent design implementation.
- **Mock API**: JSON Server is used to simulate API calls, providing a quick and easy way to test CRUD operations without a real backend.

## Code Quality
- **ESLint**: Ensures code quality and consistency.
- **Prettier**: Enforces consistent code formatting.

## Responsive Design
The application is fully responsive and works well on different screen sizes, including desktops, tablets, and mobile devices.

## .env File
Make sure to include the following in your `.gitignore` to avoid committing sensitive information:
