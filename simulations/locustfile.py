from locust import HttpUser, task, between

class BaseCoderUser(HttpUser):
    headers = {"Content-Type": "application/json"}

    def execute_code(self, language, code):
        data = '{"code":"' + code + '"}'
        self.client.post(f"/code/execute/{language}", data=data, headers=self.headers)

    def autocomplete_code(self, language, prefix):
        data = f'{{"code":"{prefix}", "line": 0, "col": 4}}'
        self.client.post(f"/code/autocomplete/{language}", data=data, headers=self.headers)


class FastCoderUser(BaseCoderUser):
    wait_time = between(0.5, 1)

    @task(5)
    def execute_python_code_fast(self):
        self.execute_code("python", 'print("Hello Fast World")')

    @task(2)
    def autocomplete_python_code_fast(self):
        self.autocomplete_code("python", "fast")


class IntermediateCoderUser(BaseCoderUser):
    wait_time = between(1, 3)

    @task(3)
    def execute_python_code_intermediate(self):
        self.execute_code("python", 'print("Hello Intermediate World")')

    @task(1)
    def autocomplete_python_code_intermediate(self):
        self.autocomplete_code("python", "inter")


class SlowCoderUser(BaseCoderUser):
    wait_time = between(2, 5)

    @task(1)
    def execute_java_code_slow(self):
        self.execute_code("java", 'public class SlowTest { public static void main(String[] args) { System.out.println("Hello Slow World and Java!"); } }')

    @task(2)
    def autocomplete_python_code_slow(self):
        self.autocomplete_code("python", "slow")
        

class CombinedUser(HttpUser):
    wait_time = between(1, 3)
    tasks = [FastCoderUser, IntermediateCoderUser, SlowCoderUser]


# locust -f your_script.py --headless -u 100 -r 10 --run-time 1h --host=http://yourhost.com
