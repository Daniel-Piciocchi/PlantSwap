## PlantSwap (Coding Component)

This README contains the installation guide for running the application, the libraries used, and the agile methodology that can be viewed on the Trello board.

## Installation

#### Clone the repository:

https://github.com/Daniel-Piciocchi/PlantSwap

#### Install the necessary dependencies for the client-side (React) using the following command:

npm install

#### Install the necessary dependencies for the server-side (Node.js) using the following command:

npm install

#### How to Run

Client-Side (React)

To start the client-side of the application, run the following command:


npm start

The React application will be available at http://localhost:3000.

#### Server-Side (Node.js)

To start the server-side of the application, run the following command:

npm start

The server will be running at http://localhost:5001.

## Libraries Used

#### Client Side:

@testing-library/jest-dom, @testing-library/react, @testing-library/user-event: Testing utilities for React applications. They allow you to write and run tests for React components using Jest.

axios: A popular library for making HTTP requests to the server. It simplifies the process of sending and handling asynchronous requests.

cors: A middleware that enables Cross-Origin Resource Sharing (CORS) on the client-side. It allows the client-side application to make requests to the server running on a different domain.

formik: A form library for React that simplifies form handling and validation. It allows you to manage form state and handle form submission efficiently.

jwt-decode: A library for decoding JSON Web Tokens (JWT). It is used to extract user information from the JWT after successful authentication.

multer: A middleware for handling file uploads in Node.js. It is used to process and store images uploaded by users.

react: The core library for building user interfaces in React applications.

react-dom: A package for integrating React with the DOM (Document Object Model). It handles rendering React components to the web page.

react-router-dom: A popular library for handling client-side routing in React applications. It allows navigation between different pages without triggering a full server refresh.

react-scripts: A set of scripts and configurations for bootstrapping and running React applications. It simplifies the development process by providing preconfigured build and development tools.

superagent: A library for making HTTP requests from the client-side. It simplifies sending and handling API requests similar to Axios.

web-vitals: A library for measuring web performance metrics, such as Largest Contentful Paint (LCP) and First Input Delay (FID). It helps developers monitor and optimize the performance of their web applications.

yup: A validation library that works seamlessly with Formik. It is used to define validation rules for form fields and provides error messages based on those rules.

#### Server Side:

bcryptjs: A library for hashing passwords securely. It is used to hash and compare passwords for user authentication.

cors: A middleware for enabling Cross-Origin Resource Sharing (CORS) on the server-side. It allows the server to handle requests from client-side applications running on different domains.

express: A minimal and flexible web application framework for Node.js. It simplifies the process of creating server-side applications and handling HTTP requests.

express-session: A middleware for managing user sessions in Express applications. It stores session data on the server and sends a session ID to the client to identify the session.

jsonwebtoken: A library for creating and verifying JSON Web Tokens (JWT). It is used to generate and verify tokens for user authentication and authorization.

mongoose: A popular Object Data Modeling (ODM) library for MongoDB. It simplifies working with MongoDB by providing a schema-based solution for modeling data.

multer: A middleware for handling file uploads in Node.js. It is used to process and store images uploaded by users.

passport: A library for authentication in Node.js applications. It provides an easy-to-use interface for implementing various authentication strategies, such as local, JWT, etc.

passport-jwt: A Passport strategy for handling JSON Web Token (JWT) authentication. It is used to authenticate users using JWT tokens.

passport-local: A Passport strategy for handling local username and password authentication. It is used to authenticate users with their username and password.

passport-local-mongoose: A Mongoose plugin that simplifies user authentication using Passport with local strategy. It provides methods to manage user authentication easily.

## Agile Methodologies

Throughout the project, I followed Agile methodologies to ensure efficient project management and collaboration among team members (myself). 

Agile methodologies allowed me to embrace changes in requirements, prioritize tasks, and deliver incremental updates regularly. 

I adopted the following Agile practices:

Sprints: I divided the project into short sprints, typically one to two weeks long, to focus on specific tasks and goals.

Scrum Meetings: Regular stand-up meetings were held to discuss progress, challenges, and plans for the next sprint.

Backlog and User Stories: I maintained a product backlog with user stories to prioritize features and improvements.

Continuous Integration: I used version control and continuous integration tools to automate the build and deployment process.

Test-Driven Development (TDD): I practiced TDD to write tests before implementing new features, ensuring code quality and functionality.

Code Reviews: All code changes were reviewed to maintain code quality and identify potential issues.

Retrospectives: After each sprint, I conducted retrospectives to evaluate the sprint's success and identify areas for improvement.

## Trello Board

### Backend

1. Setup and configuration

![alt text for screen readers](/src/images/Setup_Configuration.png "1")

2. Middleware & Logging

![alt text for screen readers](/src/images/Middleware_Logging.png "2")

3. Database Integration

![alt text for screen readers](/src/images/Database_Integration.png "3")

4. API Endpoints

![alt text for screen readers](/src/images/API_Endpoints.png "4")

5. Authentication & Authorization

![alt text for screen readers](/src/images/Authentication_Authorization.png "5")

6. Deployment

![alt text for screen readers](/src/images/Deployment_Back.png "6")

### Frontend

1. Project Setup

![alt text for screen readers](/src/images/Project_Setup.png "1")

2. Component Design

![alt text for screen readers](/src/images/Component_Design.png "2")

3. API Integration

![alt text for screen readers](/src/images/API_Integration.png "3")

4. User Interface Enhancements

![alt text for screen readers](/src/images/User_Interface_Enhancements.png "4")

5. User Authentication

![alt text for screen readers](/src/images/User_Authentication.png "5")

6. Testing & Debugging

![alt text for screen readers](/src/images/Testing_Debugging.png "6")

7. Deployment

![alt text for screen readers](/src/images/Deployment_Front.png "7")