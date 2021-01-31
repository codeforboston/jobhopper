# JobHopper Stack

A complete, working JobHopper application consists of several services. We use Docker and Docker Compose to build, configure, and run the services.

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
SECRET_KEY=<your-secret> DOMAIN=<your-domain> ./start-prod
```

This will use the latest images on Docker Hub. The host machine must be reachable on ports 80 and 443 at the domain you specify.
