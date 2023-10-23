# Chat Bot

Welcome to the Chat Bot repository. This project utilizes React and the Next.js framework for the frontend and employs Node.js to create a mock API for the backend

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
  - [Extensible State Management](#extensible-state-management)
  - [Responsive Design](#responsive-design)
  - [Modular Architecture](#modular-architecture)
- [Launch the Mission](#launch-the-mission)

## Getting Started

To build and run the project, follow these steps:

1. **Install Dependencies**: Ensure you have npm installed. Run the following command to install project dependencies:

   ```bash
   npm install
2. **Start the Project**: After successfully installing the dependencies, start the project:

   ```bash
   npm run dev
3. The project includes user authentication, requiring users to register before they can log in. For those who wish to use existing login credentials, they can use `user_one@gmail.com` as the username and `user_one` as the password. Currently, authentication is achieved by temporarily storing user details in local storage. I have plans to integrate it with a database when time permits. Upon successful login, a key is stored in a cookie to enable seamless access to the application on return visits.
4. After a successful login, users will be directed to the home page. Here, they will have access to the featured book and a consistent navigation bar that will be available on every page. The navigation bar allows users to access various sections:
5. **Home Page**: Users can view the featured book.
6. **Books**: In the "Books" section, users can explore all available books. This section includes a search filter and the option to sort books by author name. Users can also click on individual books to access their full descriptions.
7. **Authors**: In the "Authors" section, users can browse all the authors and the books they have authored. Clicking on an author card will take users to a page displaying all books written by that particular author.
8. Users will also be provided with the capability to manage their shopping cart. They can add or remove items from the cart and specify the quantity for each item. This functionality is managed using Redux.
## Features

### Extensible State Management
We've harnessed the power of Redux to manage the state of Books, Authors and the cart items. Redux ensures a robust and organized state management system, making the application highly maintainable and extensible.

### Responsive Design
This project is designed to adapt to various devices and screen sizes. I've used media queries to provide a seamless experience across desktops, tablets, and smartphones.

### Modular Architecture
To enhance code maintainability and readability, I've adopted a modular approach. The project leverages Redux to extract state management logic from React components, promoting clean and organized code.

-------

## Launch the Mission

Start your extraordinary journey now at [Book Store](https://main--delicate-mermaid-0ea435.netlify.app/) and become a part of the adventure!
