FROM staticfloat/nginx-certbot:latest

COPY --from=frontend-release /app/build /usr/share/nginx/html
COPY uwsgi_params .