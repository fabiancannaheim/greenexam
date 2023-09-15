# GreenExam
## :leaves: Sustainable programming environment for electronic exams :leaves:

The aim of this project is to create a sustainable, adaptive web-based Integrated Development Environment (IDE) for electronic exams. This IDE will be designed to be resource-efficient and adaptive to system metrics like CPU and RAM usage. When the system is under heavy load, it will dynamically scale down non-essential features to maintain stability.

### Main objectives
- **Resource-efficient backend**<br>Needs to be adaptive based on reported system metrics like CPU and RAM usage. Functionalities should be reduced in dynamic manner to ensure stability under high loads.<br><br>
- **Functional frontend**<br>Web-based IDE that supports basic coding needs like writing, running and debugging. Code completion, syntax highlighting are bonuses.<br><br>
- **Server monitoring**<br>Continuous monitoring and adequate reactions to metrics form the core of this project.<br><br>
- **Fairness in user experience**<br>No user should have unfair advantages due to the resource allocation algorithms.

### Tech Stack
**Backend:** Node.js with express.js; socket.io for real-time communication<br>
**Frontend:** React.js with CodeMirror or Ace.js for the code editor<br>
**Monitoring:** Prometheus for metrics collection and Grafana for visualization<br>







