# Chat Bot

Welcome to the Chat Bot repository. This project utilizes React and the Next.js framework for the frontend and employs Node.js to create a mock API for the backend

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
  - [Dark Mode and Light Mode](#dark-mode-and-light-mode)
  - [Extensible State Management](#extensible-state-management)
  <!-- - [Responsive Design](#responsive-design) -->
  <!-- - [Modular Architecture](#modular-architecture) -->

## Getting Started

To build and launch the project, please make sure you are in the "chat-bot" directory and execute the following commands in sequence. Ensure that you have npm installed, and follow these steps:

1. **Build and run Backend**: Ensure you have npm installed. Run the following commands to install project dependencies and run the backend server:

   ```bash
   cd backend && npm start
2. **Start the Project**: After successfully starting the Backend server, Please open a new terminal and run the following commands to install project dependencies and run the frontend project:

   ```bash
   cd frontend && yarn dev
4. In this project, I opted for React and Next.js as the front-end tools. The combination of React and Next.js is instrumental in crafting dynamic web applications. React serves as a versatile and efficient front-end library for dynamic user interfaces, while Next.js elevates the development process by facilitating server-side rendering, automated code splitting, and streamlined routing. This harmonious combination empowers developers to construct high-performing, SEO-friendly applications while enjoying a seamless developer experience, making it a primary choice for crafting web applications.
3. After a successful installation and startup of both projects, please proceed to access the URL provided by the frontend project. In this setup, a Node.js based mock API has been implemented. Data will be stored on the Node server as long as the server remains running. However, it's important to note that once the server is closed or stopped, any data saved on the server will be lost.
4. Upon entering the project, we perform a check for any existing ongoing conversations. If such conversations exist, we redirect users to the most recent one. If there are no ongoing conversations, we initiate a new conversation and then automatically redirect users to that fresh conversation. This dynamic behavior ensures a seamless and user-friendly experience within the project.
5. I've implemented a function that intentionally generates errors with a 60% probability (meaning it will fail 6 times out of 10). In the event of an error, users have the option to retry the request by clicking a "regenerate" button, and the subsequent attempt is guaranteed to yield a successful response without errors. This feature enhances error handling and ensures a more reliable user experience.
6. Users have the capability to engage in multiple conversations with the bot, with all of these interactions conveniently accessible via the left sidebar. This intuitive design allows users to navigate between past conversations and provide reactions to the responses received from the server, enhancing their overall engagement and experience with the chatbot.
## Features

### Dark Mode and Light Mode
This project offers a versatile user experience with the option to switch between Dark Mode and Light Mode. This feature allows users to customize the appearance of the application to suit their preferences and needs. Whether it's working in low-light conditions or simply a matter of personal style, the ability to toggle between dark and light themes enhances readability and visual comfort. To use this feature, simply look for the mode-switching control in the user interface and adjust it according to your preference. This feature not only adds a touch of personalization to the application but also contributes to improved user accessibility.

### Extensible State Management
This project employs React's Context API for efficient state management and data sharing among components. By creating a context and provider as demonstrated in ValueContext.js, we simplify data handling and ensure a centralized approach to state management. This enhances the maintainability and reliability of the application, especially in complex React projects.

<!-- ### Responsive Design
This project is designed to adapt to various devices and screen sizes. I've used media queries to provide a seamless experience across desktops, tablets, and smartphones. -->

<!-- ### Modular Architecture
To enhance code maintainability and readability, I've adopted a modular approach. The project leverages Redux to extract state management logic from React components, promoting clean and organized code. -->
