FROM staticfloat/nginx-certbot:latest

COPY --from=jobhopper-frontend-release /app/build /usr/share/nginx/html
COPY uwsgi_params .