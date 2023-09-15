# GreenExam
## :leaves: Sustainable programming environment for electronic exams :leaves:

The aim of this project is to create a sustainable, adaptive web-based Integrated Development Environment (IDE) for electronic exams. This IDE will be designed to be resource-efficient and adaptive to system metrics like CPU and RAM usage. When the system is under heavy load, it will dynamically scale down non-essential features to maintain stability.

### Main objectives
**Resource-efficient backend**<br>Needs to be adaptive based on reported system metrics like CPU and RAM usage. Functionalities should be reduced in dynamic manner to ensure stability under high loads.

**Functional frontend**<br>Web-based IDE that supports basic coding needs like writing, running and debugging. Code completion, syntax highlighting are bonuses.

**Server monitoring**<br>Continuous monitoring and adequate reactions to metrics form the core of this project.

**Fairness in user experience**<br>No user should have unfair advantages due to the resource allocation algorithms.

### Tech Stack
**Backend:** *Node.js* with *express.js*; socket.io for real-time communication<br>
**Frontend:** *React.js* with *CodeMirror* or *ace.js* for the code editor<br>
**Monitoring:** *Prometheus* for metrics collection and *Grafana* for visualization<br>

### Features to toggle on / off

The key is to identify functionalities that can be classified as "nice-to-have" but are not essential for the core functionality. Toggling these features based on resource load will help in achieving sustainability and fairness. The following is a list of possible candidates:

#### *Backend*

**Real-time code compilation**<br>One of the most resource-intensive tasks.

**Test execution**<br>Running test cases for code can be another heavy task.

**Error checking**<br>Real-time linting and error-checking.

**Code analysis**<br>More extensive analysis of code to identify optimizations, smells or vulnerabilities.

**Version control**<br>Allow students to rollback to previous versions of code. Requires maintaining a history of code changes.

**Chat support**<br>Chat functionality to ask queries could be switched on / off

**File operations**<br>Upload / download of resources can consume significant bandwidth and processing.

**Statistics**<br>Showing real-time leaderboards and other stats can require continuous database reads / writes.

**Real-time notifications**<br>Disable real-time alerts or notifications sent to  students about various events (e.g., test pass/fail, new assignments).

**Language support**<br>Temporarily disable support for programming languages that require more computational power for compiling/testing.

**Scheduled tasks**<br>Automatic grading, code validation, or any other cron jobs can be delayed.

**Cloud integration**<br>Features allowing students to deploy code to the cloud can also be resource-heavy.

**Outgoing callbacks**<br>Disabling any outgoing HTTP callbacks to third-party services for extended functionalities.

**Throttling**<br>Limit the number of requests from each client within a specific time frame.

**Resource-intensive APIs**<br>Any additional APIs that provide extended functionalities like code translation or sharing code.

#### *Frontend*

**Rich text editor**<br>Could be switched to a basic text editor to reduce JavaScript rendering load.

**Code snippets library**<br>A library for code snippets could be turned off to reduce database lookups.

**Recent activity stream**<br>Turn off the display of real-time or historical activity.

**Theme customization**<br>Limit the ability to change the UI themes dynamically.

**Preview features**<br>Live previews for frontend code (HTML, CSS rendering) can be heavy and could be disabled.

**Debouncing**<br>Limit the number of requests from each client within a specific time frame (like throttling but by waiting a certain time before invoking a function again).

### Patterns in functionalities

Some functionalities naturally fit together and toggling them as a group might yield better resource management.

**Read-heavy Operations**<br>Features like dashboard Updates, real-time Notifications, leaderboard/statistics are read-heavy and could be toggled together.

**Write-heavy Operations**<br>Features like version control, file operations, and chat support are more write-heavy and could be grouped together.

**Compute-heavy Operations**<br>Real-time Compilation, auto-completion, code analysis are more CPU-intensive and could be toggled as a group.

### Concurrency

| Synchronous operations           | Asynchronous operations           |
|----------------------------------|-----------------------------------|
| Block execution until task is done, so they are resource-intensive and could block other operations. | Allow other tasks to continue before operation completes, which is generally more efficient.
| Wherever possible, functionalities should be implemented asynchronous to prevent them from blocking other operations. For instance, code compilation or test execution could be made asynchronous. | Identification which features must necessarily be synchronous seems to be key. Their impact should be minimized. Making them optional during high load is also possible.

### General strategies

**Caching**<br>Server-side caching strategies to store frequently used data could help to reduce the need for database reads.

**Task Queues**<br>For write-heavy or compute-heavy operations, a task queue can be used to process tasks asynchronously in the background.

**Lazy Loading**<br>On the frontend, lazy loading helps for elements like images, scripts, or even sections of the IDE, so they only load when needed.

**Microservices Architecture**Decomposition of an application into small, loosely coupled services. This will allow to scale only parts of the application that are under stress.

### Implementation details

#### Monitoring server load with prometheus

Prometheus is the tool of choice due to it's scalability and reliability. It offers a query language to utilize load metrics and works well with visualization tools like Grafana. It consists of:

- **Prometheus server** which collected metrics and stores them
- **Node exporter** exports system metrics like CPU and memory figures
- **Instrumentation** possible via client libraries to instrument the node.js code

This way, each time the backend application is called, the program will be able to first check the system metrics. Based on this check, an algorithm will decide the scope of functions to be delivered to the user.


