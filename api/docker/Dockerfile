FROM python:3.7-buster as debug

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt 
COPY . .
EXPOSE 8000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && docker/run-debug.sh

FROM debug as release

ENV DJANGO_DEBUG=False
RUN useradd uwsgi

CMD /wait && docker/run-release.sh