-- Create Database
CREATE DATABASE IF NOT EXISTS greenexam;

-- Give privileges to db user
GRANT ALL PRIVILEGES ON greenexam.* TO 'fca'@'localhost';

-- Use the created database
USE greenexam;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    role ENUM('student', 'admin') NOT NULL,
    UNIQUE(username)
);

-- Create Languages Table
CREATE TABLE IF NOT EXISTS programming_languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    compiler VARCHAR(100) NOT NULL,
    executor VARCHAR(100) NOT NULL
);

-- Create Exams Table
CREATE TABLE IF NOT EXISTS exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    skeleton TEXT NOT NULL,
    solution TEXT NOT NULL,
    points INT NOT NULL,
    exam_id INT,
    lang_id INT,
    FOREIGN KEY (exam_id) REFERENCES exams(id),
    FOREIGN KEY (lang_id) REFERENCES programming_languages(id)
);

-- Create Hints Table
CREATE TABLE IF NOT EXISTS hints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Create Answers Table
CREATE TABLE IF NOT EXISTS answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INT,
    question_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Create Test Cases Table
CREATE TABLE IF NOT EXISTS test_cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Create ExecutionResults Table
CREATE TABLE IF NOT EXISTS execution_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    test_case_id INT,
    actual_output TEXT,
    passed BOOLEAN,
    execution_time_ms INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (test_case_id) REFERENCES test_cases(id)
);

-- Simple test entries

-- User accounts (both student and admin roles)
INSERT INTO users (username, email, password, role) VALUES ('annahfab_admin', 'annahfab@students.zhaw.ch', '$2b$10$9RZfxgFK8mOMwVwAsFcuo.1DW.M2xE/sT3QSZxaRvlAlS69FCFYgS', 'admin'); -- PW: annahfab123admin
INSERT INTO users (username, email, password, role) VALUES ('mohamsch_admin', 'mohamsch@students.zhaw.ch', '$2b$10$6Y3tW7nvUc1g/pIun.mN6eRcpV13URB2qrdt2qBZfeY9UXyCw9gVu', 'admin'); -- PW: mohamsch123admin
INSERT INTO users (username, email, password, role) VALUES ('annahfab_student', 'annahfab@students.zhaw.ch', '$2b$10$XXZX3d.nFD8f7GO/me0/d.mHl5z1sGMXzu3vdk/aNNIUH.GwaZYFy', 'student'); -- PW: annahfab123student
INSERT INTO users (username, email, password, role) VALUES ('mohamsch_student', 'mohamsch@students.zhaw.ch', '$2b$10$YWHG6kpR85QCSLP1gjhq9OeqtsZgSrZaKOfwY/qdejXGuDwPkCUkK', 'student'); -- PW: mohamsch123student

-- Programming languages
INSERT INTO programming_languages (name, compiler, executor) VALUES ('Java', '/bin/javac', '/bin/java');
INSERT INTO programming_languages (name, compiler, executor) VALUES ('Python', '', '/bin/python3');
INSERT INTO programming_languages (name, compiler, executor) VALUES ('C', '/bin/gcc', '');

-- Exams (for each admin one; both in Java)
INSERT INTO exams (title, user_id) VALUES ('Programmieren 1', 1);
INSERT INTO exams (title, user_id) VALUES ('Programmieren 2', 2);

-- Questions (for each exam two)
INSERT INTO questions (title, description, skeleton, solution, lang_id, points, exam_id) 
VALUES ('Hello World Program', 'Write a Java program to display "Hello, World!" on the screen.', '', 'public static void main (String args){ ... }', 1, 1, 1);
INSERT INTO questions (title, description, skeleton, solution, lang_id, points, exam_id) 
VALUES ('Basic Arithmetic Operations', 'Write a Java program to take two integers as input from the user and print their sum, difference, product, and quotient.', '', 'public static void main (String args){ ... }', 1, 1, 1);
INSERT INTO questions (title, description, skeleton, solution, lang_id, points, exam_id) 
VALUES ('Check Even or Odd', 'Write a Java program to check whether a given number (input from the user) is even or odd.', '', 'public static void main (String args){ ... }', 1, 1, 2);
INSERT INTO questions (title, description, skeleton, solution, lang_id, points, exam_id) 
VALUES ('Array Iteration', 'Write a Java program that creates an array of five integers and prints each element and its corresponding index.', '', 'public static void main (String args){ ... }', 1, 1, 2);

-- Hints for questions
INSERT INTO hints (question_id, content) VALUES (1, 'Remember to use System.out.println() for printing to the console.');
INSERT INTO hints (question_id, content) VALUES (2, 'Use Scanner to take inputs. You will need to use multiple nextInt() calls.');
INSERT INTO hints (question_id, content) VALUES (3, 'A number is even if it is divisible by 2. Use modulo operator (%) to check divisibility.');
INSERT INTO hints (question_id, content) VALUES (4, 'Use a for-loop to iterate through the array elements.');

-- Answers for annahfab_student
INSERT INTO answers (user_id, question_id, content) VALUES (3, 1, 'public static void main (String args){ System.out.println("Hello, World!"); }');
INSERT INTO answers (user_id, question_id, content) VALUES (3, 2, 'public static void main (String args){ /* ... user input and arithmetic operations ... */ }');

-- Answers for mohamsch_student
INSERT INTO answers (user_id, question_id, content) VALUES (4, 3, 'public static void main (String args){ /* ... even or odd check ... */ }');
INSERT INTO answers (user_id, question_id, content) VALUES (4, 4, 'public static void main (String args){ int[] arr = {1, 2, 3, 4, 5}; for(int i=0; i<arr.length; i++){ System.out.println(i + " -> " + arr[i]); } }');

INSERT INTO test_cases (question_id, input, expected_output) VALUES (1, '', 'Hello, World!\n');
INSERT INTO test_cases (question_id, input, expected_output) VALUES (2, '5\n7\n', '12\n-2\n35\n0.7142857142857143\n');
INSERT INTO test_cases (question_id, input, expected_output) VALUES (3, '4\n', 'Even\n');
INSERT INTO test_cases (question_id, input, expected_output) VALUES (4, '', '0 -> 1\n1 -> 2\n2 -> 3\n3 -> 4\n4 -> 5\n');

-- Results for annahfab_student
INSERT INTO execution_results (user_id, test_case_id, passed, actual_output) VALUES (3, 1, 1, 'Hello, World!\n'); -- Assuming the test case passed
INSERT INTO execution_results (user_id, test_case_id, passed, actual_output) VALUES (3, 2, 0, '12\n-3\n35\n0.6666666666666666\n'); -- Assuming the test case failed due to wrong arithmetic

-- Results for mohamsch_student
INSERT INTO execution_results (user_id, test_case_id, passed, actual_output) VALUES (4, 3, 1, 'Even\n'); -- Assuming the test case passed
INSERT INTO execution_results (user_id, test_case_id, passed, actual_output) VALUES (4, 4, 1, '0 -> 1\n1 -> 2\n2 -> 3\n3 -> 4\n4 -> 5\n'); -- Assuming the test case passed

