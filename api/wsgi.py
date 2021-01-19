"""
WSGI config for jobhopper project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os
from dotenv import load_dotenv

project_folder = os.path.expanduser("~/jobhopper")  # adjust as appropriate
load_dotenv(os.path.join(project_folder, ".env"))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jobhopper.settings")

application = get_wsgi_application()
