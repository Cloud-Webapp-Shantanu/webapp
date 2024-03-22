Webapp for CSYE 6225 

## Instructions:
To run this web application, follow these steps:

1. Open your terminal.
2. Run the command `npm install` to install the required dependencies.
3. Start the server by running `npm run dev`.
4. Open your preferred API testing tool, such as Postman.
5. Import the provided Postman collection and execute the requests.
6. To run test cases, execute the command `npm test`.

## Operations:
This web application provides the following routes:

Public Routes:
- GET - /healthz: Retrieves the health status of the server.
- POST - /v1/user: Creates a new user.

Authenticated Routes:
- GET - /v1/user/self: Retrieves user information.
- PUT - /v1/user/self: Updates user information.

## Tech Stack:
This web application is built using the following technologies:

- NodeJS: A JavaScript runtime environment.
- Express: A fast and minimalist web application framework for NodeJS.
- Sequelize: A promise-based ORM for NodeJS that supports multiple databases.
- PostgreSQL: A powerful open-source relational database management system.

This project also includes Nodemon, which automatically restarts the server whenever code changes are detected.

## Packer and GitHub Actions:
This project utilizes Packer and GitHub Actions for the following purposes:

- On pull request:
    - Code compilation is checked.
    - Test cases are executed.

- On push:
    - A machine image is created in the GCP project.

## Logging:
This web application utilizes the following logging mechanisms:

- Winston: A versatile logging library for Node.js applications.
- GCP Ops Agent: Installed during the Packer build of the image, it tails the log from the specified location into Cloud  Logging.

Logging allows for better monitoring and troubleshooting of the web application by capturing important events and errors.
