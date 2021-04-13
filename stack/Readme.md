# JobHopper Stack

A complete, working JobHopper application consists of several services. We use Docker and Docker Compose to build, configure, and run the services.

## Overview

Put simply, the goal is to combine all of the code in the repo into units called containers.
These containers get hosted on an external site called dockerhub.
They are then used to run in a "swarm cluster" within the docker engine.

There are three parts:

- A container for the PostgresDB.
- A container for the Django backend that interacts with the db providing api calls.
- A container for the nodejs/react front-end website that uses the django backend for api calls.

### Serving Django in Production

uwsgi is an implementation of the Web Server Gateway Interface.
This is used to ensure that the django application has a way to talk to the outside world.
That is because django when run in debug mode is not a production worthy webserver. Nginx is.

This setup is looking to achieve:
the web client <-> the web server <-> the socket <-> uWSGI <-> Python
chrome/firefox/ie <-> NginX <-> the socket <-> uWSGI <-> Django/Python

uwsgi --socket mysite.sock --module mysite.wsgi --chmod-socket=664

## Setup

For more details, see [Installation](../docs/Installation.md).

1. Install Docker and Docker Compose.
2. Copy `stack/compose/.env.template` to `stack/compose/.env`
3. Specify the `ONET` credentials in the `.env` file. If you're going to run the production environment, also specify the `SECRET_KEY` and `DOMAIN`.

## Development Environment

The development environment makes development easier by providing additional error logging, automatically reloading services when you change code, and lacking security to improve debugging. It is **not** safe to publicly host the application using development.

### Services

- Frontend development server
- Django debug server
- PostgreSQL database

### Usage

Run `./stack/dev up`. To stop the application, press control+C.

Special notes for native windows users:
make sure to update the run-debug.sh file to have LF (not CRLF) line endings or your api container may fail.

similarly, this minor edit when debugging was also made to update the line endings on-the-fly did not ensure the process worked:
RUN chmod +x /wait && \
 sed -i 's/\r$//' docker/run-debug.sh && \  
 chmod +x docker/run-debug.sh

## Production Environment

The production environment is designed to be more secure and performant than the development environment. It is suitable for hosting the JobHopper application on a public domain.

### Services

- Nginx gateway with Certbot SSL certificate manager
- Django production API server
- PostgreSQL database

Nginx serves the app to the public, providing HTTPS support, static hosting for the frontend website, and a reverse proxy for API requests. Certbot runs periodically to renew SSL certificates.

### Running Locally with Docker Compose

You can start an instance of the production application with these commands:

```sh
cd stack
./prod build
./compose/prod-deployment up
```

The machine you run this on must be reachable on ports 80 and 443 at the `DOMAIN` you specified.

### Deploying with Docker Swarm

We use Docker in swarm mode to run the public production deployment. In swarm mode, Docker automatically restarts services on reboot and if they crash.

First, SSH in to the deployment host and initialize swarm mode using the public IP address of the machine.

```
# Log into the deployment machine
ssh user@<PUBLIC-IP>
# Run on the deployment host machine
docker swarm init --advertise-addr <PUBLIC-IP>
```

Then, clone this repository on the deployment host:

```
git clone https://github.com/codeforboston/jobhopper.git
```

Now, whenever you want to release an updated version of the application, follow these steps:

1. Checkout the latest code for the branch you want to deploy:

```
git pull origin master
git checkout master
```

2. Publish the application images to the [jobhopper account on Docker Hub](https://hub.docker.com/u/jobhopper). You'll need push access to the repositories in order to run this step. Ask @alexjball or @jedpittman for access. This step can also be run on your development machine.

```
# Login with access to jobhopper repositories
docker login
cd stack
./prod publish
```

3. On the deployment host, restart the stack to pick up the latest images:

```
# Run on the deployment host machine
cd stack
./prod update
```

This will use the latest images on Docker Hub. The host machine must be reachable on ports 80 and 443 at the domain you specify.

**Note**: If the database should be wiped and migrations rerun on update, run `prod wipe-db` before `prod update`.
