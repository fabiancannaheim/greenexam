import time
import json
import logging
from threading import Thread
from locust import HttpUser, task, between

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class BaseCoder(HttpUser):

    abstract = True
    check_interval = 5
    rt_execute_allowed = True
    
    headers = {"Content-Type": "application/json"}

    userData = {
        'username': 'annahfab_admin',
        'password': 'annahfab123admin'
    }
    
    def on_start(self):
        Thread(target=self.check_rtexec_status, daemon=True).start()

    def check_rtexec_status(self):
        while True:
            response = self.client.get("/states/rtexec")
            self.rt_execute_allowed = response.json()['rtexec']
            time.sleep(self.check_interval)

    def execute_code(self, language, code):
        data = '{"code":"' + code + '"}'
        self.client.post(f"/code/execute/{language}", data=data, headers=self.headers)

    def autocomplete_code(self, language, prefix):
        data = f'{{"code":"{prefix}", "line": 0, "col": 4}}'
        self.client.post(f"/code/autocomplete/{language}", data=data, headers=self.headers)


class FastCoder(BaseCoder):

    @task(1)
    def execute_python_code_fast(self):
        self.execute_code("python", 'print(\\"Hello Fast World\\")')

    @task(2)
    def autocomplete_python_code_fast(self):
        self.autocomplete_code("python", "prin")

    def wait_time(self):
        if self.rt_execute_allowed:
            return between(0.5, 1)(self)
        else:
            return between(4, 6)(self)




class IntermediateCoder(BaseCoder):

    @task(1)
    def execute_python_code_intermediate(self):
        self.execute_code("python", 'print(\\"Hello Intermediate World\\")')

    @task(2)
    def autocomplete_python_cod_e_intermediate(self):
        self.autocomplete_code("python", "prin")
    
    def wait_time(self):
        if self.rt_execute_allowed:
            return between(1, 2)(self)
        else:
            return between(7, 9)(self)


class SlowCoder(BaseCoder):

    @task(1)
    def execute_java_code_slow(self):
        self.execute_code("java", 'public class SlowTest { public static void main(String[] args) { System.out.println(\\"Hello Slow World and Java!\\"); } }')

    @task(2)
    def autocomplete_python_code_slow(self):
        self.autocomplete_code("python", "prin")

    def wait_time(self):
        if self.rt_execute_allowed:
            return between(2, 3)(self)
        else:
            return between(10, 12)(self)
        

# locust -f locustfile.py
# locust -f your_script.py --headless -u 100 -r 10 --run-time 1h --host=http://yourhost.com
# locust -f locustfile.py --headless -u 7 -r 1 --host=http://localhost:3000 FastCoder:5 IntermediateCoder:3 SlowCoder:2
# locust -f locustfile.py --headless -u 7 -r 1 --host=http://localhost:3000
# locust -f locustfile.py --headless -u 7 -r 1 --host=http://localhost:3000 FastCoder:5 IntermediateCoder:3 SlowCoder:2
