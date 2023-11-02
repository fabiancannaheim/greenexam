from locust import HttpUser, task, between

class MyUser(HttpUser):
    
    wait_time = between(1, 3)  # Simulated users will wait 1-3 seconds between tasks

    @task
    def execute_python_code(self):
        headers = {"Content-Type": "application/json"}
        data = '{"code":"print(\\"Hello World\\")"}'
        self.client.post("/code/execute/python", data=data, headers=headers)

    @task
    def execute_java_code(self):
        headers = {"Content-Type": "application/json"}
        data = '{"code":"public class Test { public static void main(String[] args) { System.out.println(\\"Hello World and Java!\\"); } }"}'
        self.client.post("/code/execute/java", data=data, headers=headers)

    @task
    def autocomplete_python_code(self):
        headers = {"Content-Type": "application/json"}
        data = '{"code":"prin", "line": 0, "col": 4}'
        self.client.post("/code/autocomplete/python", data=data, headers=headers)

    @task
    def execute_c_code(self):
        headers = {"Content-Type": "application/json"}
        data = "{\"code\":\"#include <stdio.h>\\nint main() {\\nprintf(\\\"Hello World\\\");\\nreturn 0;\\n}\"}"
        self.client.post("/code/execute/C", data=data, headers=headers)
