# GreenExam
## :leaves: Sustainable programming environment for electronic exams :leaves:

The aim of this project is to create a sustainable, adaptive web-based Integrated Development Environment (IDE) for electronic exams. This IDE will be designed to be resource-efficient and adaptive to system metrics like CPU and RAM usage. When the system is under heavy load, it will dynamically scale down non-essential features to maintain stability.

### Main objectives
- **Resource-efficient backend**<br>Needs to be adaptive based on reported system metrics like CPU and RAM usage. Functionalities should be reduced in dynamic manner to ensure stability under high loads.<br><br>
- **Functional frontend**<br>Web-based IDE that supports basic coding needs like writing, running and debugging. Code completion, syntax highlighting are bonuses.<br><br>
- **Server monitoring**<br>Continuous monitoring and adequate reactions to metrics form the core of this project.<br><br>
- **Fairness in user experience**<br>No user should have unfair advantages due to the resource allocation algorithms.

### Tech Stack
**Backend:** *Node.js* with *express.js*; socket.io for real-time communication<br>
**Frontend:** *React.js* with *CodeMirror* or *ace.js* for the code editor<br>
**Monitoring:** *Prometheus* for metrics collection and *Grafana* for visualization<br>

### Features to toggle on / off

The key is to identify functionalities that can be classified as "nice-to-have" but are not essential for the core functionality. Toggling these features based on resource load will help in achieving sustainability and fairness. The following is a list of possible candidates:

#### Backend

- **Real-time code compilation**<br>One of the most resource-intensive tasks.<br><br>
- **Test execution**<br>Running test cases for code can be another heavy task.<br><br>
- **Error checking**<br>Real-time linting and error-checking.<br><br>
- **Code analysis**<br>More extensive analysis of code to identify optimizations, smells or vulnerabilities.<br><br>
- **Version control**<br>Allow students to rollback to previous versions of code. Requires maintaining a history of code changes.<br><br>
- **Chat support**<br>Chat functionality to ask queries could be switched on / off<br><br>
- **File operations**<br>Upload / download of resources can consume significant bandwidth and processing.<br><br>
- **Statistics**<br>Showing real-time leaderboards and other stats can require continuous database reads / writes.<br><br>
- **Real-time notifications**<br>Disable real-time alerts or notifications sent to  students about various events (e.g., test pass/fail, new assignments).<br><br>
- **Language support**<br>Temporarily disable support for programming languages that require more computational power for compiling/testing.<br><br>
- **Scheduled tasks**<br>Automatic grading, code validation, or any other cron jobs can be delayed.<br><br>
- **Cloud integration**<br>Features allowing students to deploy code to the cloud can also be resource-heavy.<br><br>
- **Outgoing callbacks**<br>Disabling any outgoing HTTP callbacks to third-party services for extended functionalities.<br><br>
- **Throttling**<br>Limit the number of requests from each client within a specific time frame.<br><br>
- **Resource-intensive APIs**<br>Any additional APIs that provide extended functionalities like code translation or sharing code.<br><br>

#### Frontend

- **Rich text editor**<br>Could be switched to a basic text editor to reduce JavaScript rendering load.<br><br>
- **Code snippets library**<br>A library for code snippets could be turned off to reduce database lookups.<br><br>
- **Recent activity stream**<br>Turn off the display of real-time or historical activity.<br><br>
- **Theme customization**<br>Limit the ability to change the UI themes dynamically.<br><br>
- **Preview features**<br>Live previews for frontend code (HTML, CSS rendering) can be heavy and could be disabled.





