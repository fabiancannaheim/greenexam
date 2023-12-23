FROM python:3.9-slim

WORKDIR /app

RUN pip install jedi

# Copy the script to run Jedi
COPY run_jedi.py /app/run_jedi.py

RUN useradd -m myuser
USER myuser

# Command to run when the container launches
CMD ["python", "run_jedi.py"]
