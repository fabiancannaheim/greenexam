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

Install **the required packages:
```
npm install
```
Rename .env.example to .env and fill in the necessary environment variables. Make sure to never commit the .env file.

Make sure that you have docker installed and navigate to /docker
Run the init.sh file:
```
./init.sh
```
This creates two docker instances responsible for executing code.

Run the database reset and test script:
```
./reset_and_test.sh
```

## Environment Variables

The application requires specific environment variables to run correctly. These are defined in the .env file. An example file .env.example is provided to showcase the structure.


<ul>
    <li><b>DB_HOST</b>: Host for MySQL instance, usually "localhost".</li>
    <li><b>DB_USER</b>: Database username</li>
    <li><b>DB_PASS</b>: Database password</li>
    <li><b>DB_PASS_ROOT</b>: Database root user password (for resetting the database when executing test script)</li>
    <li><b>SESSION_KEY</b>: A long hash</li>
    <li><b>SESSION_COOKIE_SECURE</b>: false (for HTTP) / true (for HTTPS)</li>
    <li><b>SESSION_COOKIE_NAME</b>: A long hash</li>
    <li><b>JSON_WEB_TOKEN_SECRET_KEY</b>: A long hash</li>
</ul>


## API Endpoints

#### Users

<ul>
    <li>Get all <b>users</b>: <i>GET /users</i></li>
    <li>Get a specific <b>user</b> by ID: <i>GET /users/:id</i></li>
    <li>Create a new admin <b>user</b>: <i>POST /users/admin</i></li>
    <li>Create a new student <b>user</b>: <i>POST /users/student</i></li>
    <li>Update a specific <b>user</b> by ID: <i>PUT /users/:id</i></li>
    <li>Delete a specific <b>user</b> by ID: <i>DELETE /users/:id</i></li>
</ul>

#### Authentication

<ul>
    <li>Login: <i>POST /auth/login</i></li>
    <li>Logout: <i>POST /auth/logout</i></li>
</ul>

#### Code Execution

<ul>
    <li>Code <b>execution</b>: <i>POST /execution/:language</i></li>
</ul>

**Examples with curl**

curl    -X POST http://localhost:3000/execution/python
        -H "Content-Type: application/json"
        -d '{"code": "print(\"Hello World\")"}'

curl    -X POST http://localhost:3000/execution/java 
        -H "Content-Type: application/json" 
        -d '{"code": "public class HelloWorld { public static void main(String[] args) { System.out.println(\"Hello World\"); }}"}'

#### System Metrics

<ul>
    <li>Usage of <b>all observed metrics</b>: <i>GET /metrics</i></li>
    <li>Usage of <b>RAM*</b>: <i>GET /metrics/cpu</i></li>
    <li>Usage of <b>CPU*</b>: <i>GET /metrics/ram</i></li>
    <li><b>Prometheus</b>: <i>GET /metrics/prometheus</i></li>
</ul>

<i>*Fractional percentages, representing the proportion of total available resources currently in use</i>

#### Programming Languages

<ul>
    <li>Get all <b>languages</b>: <i>GET /progLang</i></li>
    <li>Get a specific <b>language</b> by ID: <i>GET /progLang/:id</i></li>
    <li>Create a new <b>language</b>: <i>POST /progLang</i></li>
    <li>Update a specific <b>language</b> by ID: <i>PUT /progLang/:id</i></li>
    <li>Delete a specific <b>language</b> by ID: <i>DELETE /progLang/:id</i></li>
</ul>

#### Exams

<ul>
    <li>Get all <b>exams</b>: <i>GET /exams</i></li>
    <li>Get a specific <b>exam</b> by ID: <i>GET /exams/:id</i></li>
    <li>Create a new <b>exam</b>: <i>POST /exams</i></li>
    <li>Update a specific <b>exam</b> by ID: <i>PUT /exams/:id</i></li>
    <li>Delete a specific <b>exam</b> by ID: <i>DELETE /exams/:id</i></li>
</ul>

<ul>
    <li>Get all <b>questions</b> of an <b>exam</b>: <i>GET /exams/:id/questions</i></li>
    <li>Get all <b>answers</b> of a <b>user</b> of an <b>exam</b>: <i>GET /:examId/users/:userId/answers</i></li>
</ul>

#### Questions

<ul>
    <li>Get all <b>questions</b>: <i>GET /questions</i></li>
    <li>Get a specific <b>question</b> by ID: <i>GET /questions/:id</i></li>
    <li>Create a new <b>question</b>: <i>POST /questions</i></li>
    <li>Update a specific <b>question</b> by ID: <i>PUT /questions/:id</i></li>
    <li>Delete a specific <b>question</b> by ID: <i>DELETE /questions/:id</i></li>
</ul>
<ul>
    <li>Get all <b>hints</b> of a specific <b>question</b>: <i>/questions/:id/hints</i></li>
</ul>

#### Hints

<ul>
    <li>Get all <b>hints</b>: <i>GET /hints</i></li>
    <li>Get a specific <b>hint</b> by ID: <i>GET /hints/:id</i></li>
    <li>Create a new <b>hint</b>: <i>POST /hints</i></li>
    <li>Update a specific <b>hint</b> by ID: <i>PUT /hints/:id</i></li>
    <li>Delete a specific <b>hint</b> by ID: <i>DELETE /hints/:id</i></li>
</ul>

#### Answers

<ul>
    <li>Get all <b>answers</b>: <i>GET /answers</i></li>
    <li>Get a specific <b>answer</b> by ID: <i>GET /answers/:id</i></li>
    <li>Create a new <b>answer</b>: <i>POST /answers</i></li>
    <li>Update a specific <b>answer</b> by ID: <i>PUT /answers/:id</i></li>
    <li>Delete a specific <b>answer</b> by ID: <i>DELETE /answers/:id</i></li>
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

