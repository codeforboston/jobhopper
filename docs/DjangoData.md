# Django Migrations (Changes to database)

Django is a Python based framework that helps us provide standard REST APIs to our database backend in PostgreSQL. Using a framework allows us to develop solid API endpoints for our application with less time. This document is written from Windows for developers of the JobHopper application. Users should be familiar with Python, PostgreSQL, virtual env and have the application running. This doc explains more detail about how to change the model/data/database structure.

In order to keep our Django application in sync with our database, we leverage Django migrations. Migrations are generally run with the command similar to this (Windows):

Migrations can update either the database schema (the tables/structure) or the data inside. Both types of migrations are saved in the migrations subfolder.

## See Migrations and which have been applied:

(venv) C:\Users\jedpi\OneDrive\Documents\GitHub\jobhopper>python manage.py showmigrations

Showing a snip of output

<pre>
jobs
 [X] 0001_initial
 [X] 0002_occupationtransitions
 [X] 0003_auto_20200909_1254
 [X] 0004_auto_20200909_1255
 [X] 0005_auto_20200914_1220
 [X] 0006_blsoesfakes
 [X] 0007_stateabbpairs
 [ ] 0008_auto_20201006_AddStateData
sessions
 [X] 0001_initial
 </pre>

## Apply missing migrations (e.g. 0008 above)

(venv) C:\Users\jedpi\OneDrive\Documents\GitHub\jobhopper>python manage.py migrate

## Roll the migration off:

(venv) C:\Users\jedpi\OneDrive\Documents\GitHub\jobhopper>python manage.py migrate jobs 0007

## Setup an empty data migration so you can code it yourself (example is shown for jobs project)

(venv) C:\Users\jedpi\OneDrive\Documents\GitHub\jobhopper>python manage.py makemigrations --empty jobs

## More Resources

[https://docs.djangoproject.com/en/1.10/ref/migration-operations/]
