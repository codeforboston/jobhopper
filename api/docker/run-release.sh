#!/bin/bash

set -ex
env
python manage.py migrate

uwsgi \
  --socket :8000 \
  --module jobhopper.wsgi \
  --uid uwsgi \
  --master \
  --enable-threads