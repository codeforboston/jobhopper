FROM python:3.7-buster
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt 
COPY . .
EXPOSE 8000
CMD docker/docker-run.sh