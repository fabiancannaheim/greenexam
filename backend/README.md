# GreenExam Backend API

## Introduction
This repository contains the backend code for the GreenExam platform. The API supports user management, code execution, exam management, and more.

## Getting Started

### Prerequisites
Ensure you have Node.js and npm installed. You will need MySQL installed and running.

### Setup

Navigate to the backend directory:
```
cd /backend
```

Install the required packages:
```
npm install
```
Rename .env.example to .env and fill in the necessary environment variables. Make sure to never commit the .env file.

Run the database reset and test script:
```
./reset_and_test.sh
```

## Environment Variables

The application requires specific environment variables to run correctly. These are defined in the .env file. An example file .env.example is provided to showcase the structure.

DB_HOST: Host for MySQL instance, usually "localhost".
DB_USER: Database username
DB_PASS: Database password
DB_PASS_ROOT = Database root user password (for resetting the database when executing test script)
SESSION_KEY="A long hash"
SESSION_COOKIE_SECURE = "false" # Set to true if using HTTPS
SESSION_COOKIE_NAME = 'A long hash'
JSON_WEB_TOKEN_SECRET_KEY = "A long hash"

## API Endpoints

#### Users

<ul>
    <li>Get all users: **GET /users**</li>
    <li>Get a specific user by ID: **GET /users/:id**</li>
    <li>Create a new admin user: **POST /users/admin**</li>
    <li>Create a new student user: **POST /users/student**</li>
    <li>Update a specific user by ID: **PUT /users/:id**</li>
    <li>Delete a specific user by ID: **DELETE /users/:id**</li>
</ul>

#### Authentication

<ul>
    <li>Login: **POST /auth/login**</li>
    <li>Logout: **POST /auth/logout**</li>
</ul>

#### Code Execution

<ul>
    <li>Code execution: **POST /execution/:language**</li>
</ul>

#### Programming Languages

<ul>
    <li>Get all languages: **GET /progLang**</li>
    <li>Get a specific language by ID: **GET /progLang/:id**</li>
    <li>Create a new language: **POST /progLang**</li>
    <li>Update a specific language by ID: **PUT /progLang/:id**</li>
    <li>Delete a specific language by ID: **DELETE /progLang/:id**</li>
</ul>

#### Exams

<ul>
    <li>Get all exams: **GET /exams**</li>
    <li>Get a specific exam by ID: **GET /exams/:id**</li>
    <li>Create a new exam: **POST /exams**</li>
    <li>Update a specific exam by ID: **PUT /exams/:id**</li>
    <li>Delete a specific exam by ID: **DELETE /exams/:id**</li>
</ul>

<ul>
    <li>Get all questions of an exam: **GET /exams/:id/questions**</li>
    <li>Get all answers of a user of an exam: **GET /:examId/users/:userId/answers**</li>
</ul>

#### Questions

<ul>
    <li>Get all questions: **GET /questions**</li>
    <li>Get a specific question by ID: **GET /questions/:id**</li>
    <li>Create a new question: **POST /questions**</li>
    <li>Update a specific question by ID: **PUT /questions/:id**</li>
    <li>Delete a specific question by ID: **DELETE /questions/:id**</li>
</ul>

<ul>
    <li>Get all hints of a specific question: **/questions/:id/hints**</li>
</ul>

#### Hints

<ul>
    <li>Get all hints: **GET /hints**</li>
    <li>Get a specific hint by ID: **GET /hints/:id**</li>
    <li>Create a new hint: **POST /hints**</li>
    <li>Update a specific hint by ID: **PUT /hints/:id**</li>
    <li>Delete a specific hint by ID: **DELETE /hints/:id**</li>
</ul>

#### Answers

<ul>
    <li>Get all answers: **GET /answers**</li>
    <li>Get a specific answer by ID: **GET /answers/:id**</li>
    <li>Create a new answer: **POST /answers**</li>
    <li>Update a specific answer by ID: **PUT /answers/:id**</li>
    <li>Delete a specific answer by ID: **DELETE /answers/:id**</li>
</ul>


## Testing
Run tests using the script:
```
./reset_and_test.sh
```

To simplify the testing process, you can configure npm to run this script directly:

Open package.json.
In the "scripts" section, add the following line:
```
"test": "./reset_and_test.sh"
```

Save the file. Now, you can run the tests with:
```
npm test
```

This script also resets the database, so be cautious when using it in a production environment.

