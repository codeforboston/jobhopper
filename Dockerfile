FROM python:3.7-buster

RUN mkdir /app
WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt 

COPY . .

EXPOSE 8000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait
RUN chmod +x /app/docker-run.sh

CMD /wait && /bin/bash -c "/app/docker-run.sh"