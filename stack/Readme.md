# JobHopper Stack

A complete, working JobHopper application consists of several services. We use Docker and Docker Compose to build, configure, and run the services.

## Overview

Put simply, the goal is to combine all of the code in the repo into units called containers.
These containers get hosted on an external site called dockerhub. 
They are then used to run in a "swarm cluster" within the docker engine.

There are three parts:
a container for the PostgresDB.
a container for the django website that interacts with the db providing api calls.
a container for the nodejs/react front-end website that uses the django website for api calls.

uwsgi is an implementation of the Web Server Gateway Interface. 
This is used to ensure that the django application has a way to talk to the outside world. 
That is because django when run in debug mode is not a production worthy webserver. Nginx is. 

This setup is looking to achieve:
the web client <-> the web server <-> the socket <-> uWSGI <-> Python
chrome/firefox/ie <-> NginX <-> the socket <-> uWSGI <-> Django/Python

uwsgi --socket mysite.sock --module mysite.wsgi --chmod-socket=664


# Nginx configuration for serving the API and frontend behind an HTTPS reverse
# proxy, using Let's Encrypt for SSL certificates.
# Cobbled together from:
# https://uwsgi-docs.readthedocs.io/en/latest/tutorials/Django_and_nginx.html
# https://gist.github.com/dimitardanailov/7a7c4e3be9e03d1b578a
# https://github.com/staticfloat/docker-nginx-certbot

## Setup

Install Docker and Docker Compose.

## Development

The development environment makes development easier by providing additional error logging, automatically reloading services when you change code, and lacking security to improve debugging. It is **not** safe to publicly host the application using development.

### Services

- Frontend development server
- Django debug server
- PostgreSQL database

### Usage

Run `./stack/start-dev`. To stop the application, press control+C.
Special notes for native windows users:
make sure to update the run-debug.sh file to have LF (not CRLF) line endings or your api container may fail.

similarly, this minor edit when debugging was also made to update the line endings on-the-fly did not ensure the process worked:
RUN chmod +x /wait && \
    sed -i 's/\r$//' docker/run-debug.sh  && \  
    chmod +x docker/run-debug.sh


## Production

The production environment is designed to be more secure and performant than the development environment. It is suitable for hosting the JobHopper application on a public domain.

### Services

- Nginx gateway with Certbot SSL certificate manager
- Django production API server
- PostgreSQL database

Nginx serves the app to the public, providing HTTPS support, static hosting for the frontend build, and a reverse proxy for API requests. Certbot runs periodically to renew SSL certificates.

### Running Locally

You can start an instance of the production application with these commands:

```sh
cd stack
./build-prod
SECRET_KEY=<your-secret> DOMAIN=<your-domain> ./start-prod
```

The machine you run this on must be reachable on ports 80 and 443 at the domain you specify.

### Deploying

We use Docker in swarm mode to run the public production deployment. In swarm mode, Docker automatically restarts services on reboot and if they crash.

First, SSH in to the deployment host and initialize swarm mode using the public IP address of the machine.

```
# Run on the deployment host machine
docker swarm init --advertise-addr <PUBLIC-IP>
```

Now, whenever you want to release an updated version of the application, follow these steps:

1. Build and push the production images to the [jobhopper account on Docker Hub](https://hub.docker.com/u/jobhopper). You'll need push access to the repositories in order to run this step. Ask @alexjball or @jedpittman for access.

```
# Login with access to jobhopper repositories
docker login
cd stack
./build-prod
./push-prod
```

2. SSH into the deployment host and restart the stack to pick up the latest images

```
# Run on the deployment host machine
cd stack
SECRET_KEY=<your-secret> DOMAIN=<your-domain> ./deploy-prod
```

This will use the latest images on Docker Hub. The host machine must be reachable on ports 80 and 443 at the domain you specify.
