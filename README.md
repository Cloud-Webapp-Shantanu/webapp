Webapp for CSYE 6225 

## Instructions:
Open terminal
npm install
Run: npm run dev
Open postman collection and execute

## Operations:
Public Routes:
GET - /healthz - Gets health status of the server
POST - /v1/user - Creates a new user

Authenticated Routes:
GET - /v1/user/self - Gets user information
PUT - /v1/user/self - Updates user information

## Tech Stack
NodeJS
Express
Sequalize
PostgreSQL

Contains Nodemon for automatic server restart on code changes.